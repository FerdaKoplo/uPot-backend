import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { VineResponseDTO } from "./DTO'S/vine-response-dto.dto";
import { CreateVineDTO } from "./DTO'S/create-vine-dto.dto";
import { UpdateVineDTO } from "./DTO'S/update-vine-dto.dto";

@Injectable()
export class VinesService {
    constructor(private readonly prisma: PrismaService) { }

    async getVinesbyLeaflet(leafletId: number): Promise<VineResponseDTO[]> {
        const vineLeaflet = await this.prisma.vine.findMany({
            where: {
                leafletId,
                deletedAt: null
            },
            include: {
                leaflet: true,
                berries: true
            }
        })

        return vineLeaflet.map(vine => ({
            id: vine.id,
            title: vine.title,
            position: vine.position,
            leafletId: vine.leafletId,
            createdAt: vine.createdAt,
            updatedAt: vine.updatedAt ?? undefined,
        }))
    }

    async getDetailVine(vineId: number): Promise<VineResponseDTO> {
        const vineLeaflet = await this.prisma.vine.findUnique({
            where: {
                id: vineId
            },
            include: {
                leaflet: true,
                berries: true
            }
        })

        if (!vineLeaflet)
            throw new BadRequestException('vine not found')

        return {
            id: vineLeaflet.id,
            title: vineLeaflet.title,
            position: vineLeaflet.position,
            leafletId: vineLeaflet.leafletId,
            createdAt: vineLeaflet.createdAt,
            berries: vineLeaflet.berries,
        }
    }

    async createVine(leafletId: number, dto: CreateVineDTO): Promise<VineResponseDTO> {
        const leafletExists = await this.prisma.leaflet.findUnique({
            where: { id: leafletId }
        })

        if (!leafletExists)
            throw new BadRequestException("leaflet not found")

        const createVine = await this.prisma.vine.create({
            data: {
                title: dto.title,
                position: dto.position,
                leafletId: dto.leafletId,
                createdAt: new Date()
            }
        })

        return {
            id: createVine.id,
            title: createVine.title,
            leafletId: createVine.leafletId,
            position: createVine.position,
            createdAt: createVine.createdAt,
        }
    }


    async updateVine(leafletId: number, vineId: number, dto: UpdateVineDTO) {
        const leafletExists = await this.prisma.leaflet.findUnique({
            where: { id: leafletId }
        })

        if (!leafletExists)
            throw new BadRequestException("leaflet not found")

        const existingVine = await this.prisma.vine.findUnique({
            where: {
                id: vineId
            }
        })
        if (!existingVine)
            throw new BadRequestException("Vine not found")

        const updatedVine = await this.prisma.vine.update({
            where: {
                id: vineId
            },
            data: {
                title: dto.title,
                position: dto.position,
                leafletId: dto.leafletId
            }
        })
        return {
            id: updatedVine.id,
            title: updatedVine.title,
            leafletId: updatedVine.leafletId,
            position: updatedVine.position,
            updatedAt: updatedVine.updatedAt ?? undefined,
        }

    }

    async deleteVine(leafletId: number, vineId: number) {
        const leafletExists = await this.prisma.leaflet.findUnique({
            where: { id: leafletId }
        })

        if (!leafletExists)
            throw new BadRequestException("leaflet not found")

        const existingVine = await this.prisma.vine.findUnique({
            where: {
                id: vineId
            }
        })
        if (!existingVine)
            throw new BadRequestException("Vine not found")

        const deletedVine = await this.prisma.vine.update({
            where: {
                id: vineId
            },
            data: {
                deletedAt: new Date()
            }
        })

        return {
            ...deletedVine,
            updatedAt: deletedVine.updatedAt ?? undefined,
            deletedAt: deletedVine.deletedAt ?? undefined,

        }
    }
}