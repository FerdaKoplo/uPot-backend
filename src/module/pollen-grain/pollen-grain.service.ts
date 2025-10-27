import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { PollenGrainResponseDTO } from "./DTO'S/pollen-grain-response-dto.dto";

@Injectable()
export class PollenGrainService {
    constructor(private readonly prisma: PrismaService) { }

    async getPollenGrains(leafletId: number, foresterId: number): Promise<PollenGrainResponseDTO[]> {
        const pollenGrainLeaflet = await this.prisma.pollenGrain.findMany({
            where: {
                leafletId,
                foresterId,
                deletedAt: null
            },
            include: {
                leaflet: true,
                forester: true
            }
        })

        if (!pollenGrainLeaflet)
            throw new BadRequestException("Pollen Grain Not Found")

        return pollenGrainLeaflet.map(pollenGrain => ({
            id: pollenGrain.id,
            fileName: pollenGrain.fileName,
            fileURL: pollenGrain.fileUrl,
            fileType: pollenGrain.fileType,
            leafletId: pollenGrain.leafletId,
            foresterId: pollenGrain.foresterId,
            uploadedAt: pollenGrain.uploadedAt,
            updatedAt: pollenGrain.updatedAt,
            deletedAt: pollenGrain.deletedAt
        }))
    }

    async getDetailPollenGrain(leafletId: number, pollenGrainId: number): Promise<PollenGrainResponseDTO> {

    }

    async createPollenGrain() {

    }

    async updatePollenGrain() {

    }

    async deletePollenGrain() {

    }
}