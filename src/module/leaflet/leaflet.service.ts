import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { LeafletResponseDTO } from "./DTO'S/leaflet-response-dto.dto";
import { CreateLeafletDTO } from "./DTO'S/create-leaflet-dto.dto";
import { UpdateLeafletDTO } from "./DTO'S/update-leaflet-dto.dto";

@Injectable()
export class LeafletService {
    constructor(private readonly prisma: PrismaService) { }

    async getLeaflets(): Promise<LeafletResponseDTO[]> {
        return await this.prisma.leaflet.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: "desc" },
        })
    }

    async getDetailLeaflet(id: number): Promise<LeafletResponseDTO> {
        const existLeaflet = await this.prisma.leaflet.findUnique({
            where: {
                id,
                deletedAt: null
            }
        })

        if (!existLeaflet)
            throw new NotFoundException("Leaflet not found")

        return existLeaflet
    }

    async createLeaflet(dto: CreateLeafletDTO): Promise<LeafletResponseDTO> {
        const leaflet = await this.prisma.leaflet.create({
            data: {
                title: dto.title,
                description: dto.description,
                dueDate: dto.dueDate,
                position: dto.position,
                twigId: dto.twigId,
            },
        })

        return leaflet
    }

    async updateLeaflet(id: number, dto: UpdateLeafletDTO): Promise<LeafletResponseDTO> {
        const existing = await this.prisma.leaflet.findFirst({
            where: {
                id,
                deletedAt: null
            },
        })

        if (!existing)
            throw new NotFoundException("Leaflet not found");

        const updated = await this.prisma.leaflet.update({
            where: {
                id
            },
            data: {
                title: dto.title ?? existing.title,
                description: dto.description ?? existing.description,
                dueDate: dto.dueDate ?? existing.dueDate,
                position: dto.position ?? existing.position,
                updatedAt: new Date(),
            },
        })

        return updated;
    }

    async deleteLeaflet(id: number): Promise<{ message: string }> {
        const existing = await this.prisma.leaflet.findFirst({
            where: {
                id,
                deletedAt: null
            },
        })

        if (!existing)
            throw new NotFoundException("Leaflet not found");

        await this.prisma.leaflet.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            },
        })

        return {
            message: "Leaflet deleted successfully"
        }
    }

}