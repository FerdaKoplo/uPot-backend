import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { TwigResponseDTO } from "./DTO'S/twig-response-dto.dto";
import { CreateTwigDTO } from "./DTO'S/create-twig-dto.dto";
import { UpdateTwigDTO } from "./DTO'S/update-position-dto.dto";

@Injectable()
export class TwigService {
    constructor(private readonly prisma: PrismaService) { }

    async getTwigsByBranch(branchId: number): Promise<TwigResponseDTO[]> {

        const twigs = await this.prisma.twig.findMany({
            where: {
                branchId,
                deletedAt: null
            },
            include: {
                leaflets: true
            }

        })
        return twigs.map(twig => ({
            id: twig.id,
            title: twig.title,
            position: twig.position,
            branchId: twig.branchId,
            createdAt: twig.createdAt,
            updatedAt: twig.updatedAt ?? undefined,
            leaflets: twig.leaflets
        }))
    }

    async getDetailTwig(branchId: number, twigId: number): Promise<TwigResponseDTO> {

        const twig = await this.prisma.twig.findFirst({
            where: {
                branchId,
                id: twigId
            },
            include: {
                leaflets: true
            }
        })

        if (!twig) throw new
            NotFoundException("Twig not found")

        return {
            id: twig.id,
            title: twig.title,
            position: twig.position,
            branchId: twig.branchId,
            createdAt: twig.createdAt,
            updatedAt: twig.updatedAt ?? undefined,
            leaflets: twig.leaflets
        }
    }

    async createTwig(dto: CreateTwigDTO): Promise<TwigResponseDTO> {

        const existTwigTitle = await this.prisma.twig.findUnique({
            where: {
                title: dto.title,
            }
        })

        if (existTwigTitle)
            throw new BadRequestException("Forest name already exists")

        const newTwig = await this.prisma.twig.create({
            data: {
                title: dto.title,
                position: dto.position,
                branchId: dto.branchId
            }
        })

        return {
            id: newTwig.id,
            title: newTwig.title,
            position: newTwig.position,
            branchId: newTwig.branchId,
            createdAt: newTwig.createdAt,
        }

    }

    async updateTwig(twigId: number, dto: UpdateTwigDTO): Promise<TwigResponseDTO> {

        const existTwig = await this.prisma.twig.findUnique({
            where: {
                id: twigId
            }
        })

        if (!existTwig)
            throw new BadRequestException("twig doesnt exist")

        if (dto.title && dto.title !== existTwig.title) {
            const duplicate = await this.prisma.twig.findFirst({
                where: { title: dto.title },
            })

            if (duplicate)
                throw new BadRequestException("Forest name already exists");
        }

        const updatedTwig = await this.prisma.twig.update({
            where: {
                id: twigId
            },
            data: {
                title: dto.title,
                position: dto.position,
                updatedAt: new Date()
            }
        })

        return {
            id: updatedTwig.id,
            title: updatedTwig.title,
            position: updatedTwig.position,
            branchId: updatedTwig.branchId,
            createdAt: updatedTwig.createdAt,
            updatedAt: updatedTwig.updatedAt ?? undefined,
        }
    }

    async deleteTwig(twigId: number) {
        const existTwig = await this.prisma.twig.findUnique({
            where: {
                id: twigId
            }
        })

        if (!existTwig)
            throw new BadRequestException("twig doesnt exist")

        const deletedTwig = await this.prisma.twig.update({
            where: {
                id: twigId
            },
            data: {
                deletedAt: new Date()
            }
        })

        return {
            id: deletedTwig.id,
            title: deletedTwig.title,
            position: deletedTwig.position,
            branchId: deletedTwig.branchId,
            createdAt: deletedTwig.createdAt,
            updatedAt: deletedTwig.updatedAt ?? undefined,
            deletedAt: deletedTwig.deletedAt ?? undefined,
        }
    }


}