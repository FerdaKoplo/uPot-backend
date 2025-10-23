import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { ForestDTO } from "./DTO'S/forest.dto";
import { FilterForestDTO } from "./DTO'S/filter-forest.dto";
import { CreateForestDTO } from "./DTO'S/create-forest.dto";
import { UpdateForestDTO } from "./DTO'S/update-forest.dto";

@Injectable()
export class ForestService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserForests(foresterId: number, filter?: FilterForestDTO): Promise<ForestDTO[]> {
        const forests = await this.prisma.forest.findMany({
            where: {
                members: {
                    some: {
                        foresterId
                    }
                }
            },
            include: { members: true },
            skip: ((filter?.page ?? 1) - 1) * (filter?.limit ?? 10),
            take: filter?.limit ?? 10,
        })

        return forests.map(forest => ({
            id: forest.id,
            name: forest.name,
            description: forest.description,
            createdAt: forest.createdAt,
            memberIds: forest.members.map(m => m.foresterId),
        }))
    }

    async getForestDetail(forestId: number, foresterId: number): Promise<ForestDTO> {


        const forest = await this.prisma.forest.findFirst({
            where: {
                id: forestId,
                deletedAt: null,
            },
            include: {
                branches: true,
            },
        })

        if (!forest) throw new NotFoundException("Forest not found");

        const member = await this.prisma.forestMember.findFirst({
            where: {
                forestId,
                foresterId,
            },
            include: {
                role: {
                    include: {
                        rolePermissions: {
                            include: { permission: true },
                        },
                    },
                },
            },
        })

        if (!member)
            throw new ForbiddenException("You are not a member of this forest");

        const canView = member.role.rolePermissions.some(
            (rp) => rp.permission.name === "view_forest"
        )

        if (!canView)
            throw new ForbiddenException("You do not have permission to view this forest");

        return {
            id: forest.id,
            name: forest.name,
            description: forest.description ?? undefined,
            createdAt: forest.createdAt,
        }

    }


    async createForest(dto: CreateForestDTO): Promise<ForestDTO> {
        const existForestName = await this.prisma.forest.findUnique({
            where: {
                name: dto.name
            }
        })

        if (existForestName)
            throw new BadRequestException("Forest name already exists")

        const newForest = await this.prisma.forest.create({
            data: {
                name: dto.name,
                description: dto.description
            }
        })

        return {
            id: newForest.id,
            name: newForest.name,
            description: newForest.description ?? undefined,
            createdAt: newForest.createdAt,
            memberIds: [],
        }
    }

    async updateForest(forestId: number, dto: UpdateForestDTO): Promise<ForestDTO> {
        const existForest = await this.prisma.forest.findUnique({
            where: {
                id: forestId
            }
        })

        if (!existForest)
            throw new BadRequestException("forest doesnt exist")

        if (dto.name && dto.name !== existForest.name) {
            const duplicate = await this.prisma.forest.findFirst({
                where: { name: dto.name },
            })

            if (duplicate)
                throw new BadRequestException("Forest name already exists");
        }

        const updatedForest = await this.prisma.forest.update({
            where: {
                id: forestId
            },
            data: {
                name: dto.name ?? existForest.name,
                description: dto.description ?? existForest.description,
            },
            include: {
                members: true
            }
        })

        return {
            id: updatedForest.id,
            name: updatedForest.name,
            description: updatedForest.description ?? undefined,
            createdAt: updatedForest.createdAt,
            memberIds: updatedForest.members.map(m => m.foresterId),
        }
    }

    async deleteForest(forestId: number): Promise<ForestDTO> {
        const existingForest = await this.prisma.forest.findUnique({
            where: {
                id: forestId,
                deletedAt: null
            }
        })

        if (!existingForest)
            throw new BadRequestException("forest doesnt exist")

        const deletedForest = await this.prisma.forest.update({
            where: { id: forestId },
            data: { deletedAt: new Date() },
            include: { members: true },
        })

        return {
            id: deletedForest.id,
            name: deletedForest.name,
            description: deletedForest.description ?? undefined,
            createdAt: deletedForest.createdAt,
            memberIds: deletedForest.members.map(m => m.foresterId),
        }
    }
}