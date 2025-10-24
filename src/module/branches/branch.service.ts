import { PrismaService } from "src/utils/prisma.service";
import { BranchResponseDTO } from "./DTO'S/branch-response.dto";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateBranchDTO } from "./DTO'S/create-branch.dto";
import { AddBackgroundImageDTO } from "./DTO'S/add-background-image.dto";
import { BackgroundUpdateResponseDTO } from "./DTO'S/background-update-response.dto";
import { UpdateBranchDTO } from "./DTO'S/update-branch.dto";

export class BranchService {
    constructor(private readonly prisma: PrismaService) { }

    async getBranchByForest(forestId: number): Promise<BranchResponseDTO[]> {
        const forestBranch = await this.prisma.branch.findMany({
            where: {
                forestId,
                deletedAt: null
            },
        })

        return forestBranch.map(branch => ({
            id: branch.id,
            title: branch.title,
            visibility: branch.visibility,
            forestId: branch.forestId,
            backgroundImageUrl: branch.backgroundImageUrl ?? undefined,
            createdAt: branch.createdAt,
            updatedAt: branch.updatedAt ?? undefined,
        }))
    }

    async getDetailBranch(forestId: number, branchId: number): Promise<BranchResponseDTO> {
        const branch = await this.prisma.branch.findFirst({
            where: {
                id: branchId,
                forestId,
                deletedAt: null
            },
            include: {
                twigs: true,
                mosses: true,
                forestEchoes: true,
            },
        })

        if (!branch)
            throw new NotFoundException("branch not found")

        // const member = await this.prisma.forestMember.findFirst({
        //     where: {
        //         forestId,
        //         foresterId,
        //     },
        //     include: {
        //         role: {
        //             include: {
        //                 rolePermissions: {
        //                     include: { permission: true },
        //                 },
        //             },
        //         },
        //     },
        // })

        // if (!member)
        //     throw new ForbiddenException("You are not a member of this forest"); 

        return {
            id: branch.id,
            title: branch.title,
            visibility: branch.visibility,
            forestId: branch.forestId,
            createdAt: branch.createdAt,
            twigs: branch.twigs,
            mosses: branch.mosses,
            forestEchoes: branch.forestEchoes
        }
    }

    async createBranch(dto: CreateBranchDTO): Promise<BranchResponseDTO> {
        const newBranch = await this.prisma.branch.create({
            data: {
                title: dto.title,
                visibility: dto.visibility,
                forestId: dto.forestId,
            },
        })

        return {
            id: newBranch.id,
            title: newBranch.title,
            visibility: newBranch.visibility,
            backgroundImageUrl: newBranch.backgroundImageUrl ?? undefined,
            forestId: newBranch.forestId,
            createdAt: newBranch.createdAt,
            twigs: [],
            mosses: [],
            forestEchoes: [],
        }
    }

    async addBackgroundImage(branchId: number, dto: AddBackgroundImageDTO): Promise<BackgroundUpdateResponseDTO> {
        const existingBranch = await this.prisma.branch.findUnique({
            where: {
                id: branchId
            }
        })

        if (!existingBranch)
            throw new NotFoundException("Branch not found")

        const updateBackgroundImage = await this.prisma.branch.update({
            where: {
                id: branchId
            },
            data: {
                backgroundImageUrl: dto.backgroundImageUrl
            }
        })

        return {
            backgroundImageUrl: updateBackgroundImage.backgroundImageUrl,
            updatedAt: updateBackgroundImage.updatedAt
        }
    }

    async updateBranch(branchId: number, dto: UpdateBranchDTO): Promise<BranchResponseDTO> {
        const existingBranch = await this.prisma.branch.findUnique({
            where: {
                id: branchId
            }
        })

        if (!existingBranch)
            throw new NotFoundException("Branch not found")

        const updateBranch = await this.prisma.branch.update({
            where: {
                id: branchId
            },
            data: {
                title: dto.title,
                visibility: dto.visibility
            }
        })

        return {
            id: updateBranch.id,
            title: updateBranch.title,
            visibility: updateBranch.visibility,
            forestId: updateBranch.forestId,
            updatedAt: updateBranch.updatedAt ?? undefined,
        }
    }

    async deleteBranch(branchId: number): Promise<BranchResponseDTO> {

        const existingBranch = await this.prisma.branch.findUnique({
            where: {
                id: branchId
            }
        })

        if (!existingBranch)
            throw new NotFoundException("Branch not found")

        const deletedBranch = await this.prisma.branch.update({
            where: { id: branchId },
            data: {
                deletedAt: new Date(),
                updatedAt: new Date(),
            },
        })

        return {
            ...deletedBranch,
            updatedAt: deletedBranch.updatedAt ?? undefined,
            deletedAt: deletedBranch.deletedAt ?? undefined,
        }
    }

    async deleteBackgroundImage(branchId: number): Promise<BackgroundUpdateResponseDTO> {
        const existingBranch = await this.prisma.branch.findUnique({
            where: {
                id: branchId
            }
        })

        if (!existingBranch)
            throw new NotFoundException("Branch not found")

        const updatedBranch = await this.prisma.branch.update({
            where: { id: branchId },
            data: { backgroundImageUrl: null, updatedAt: new Date() },
        })

        return {
            backgroundImageUrl: updatedBranch.backgroundImageUrl,
            deletedAt: updatedBranch.deletedAt
        }
    }
}