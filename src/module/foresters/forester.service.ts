import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { UpdateForester } from "./DTO'S/update-forester.dto";

@Injectable()
export class ForesterService {
    constructor(private readonly prisma: PrismaService) { }

    async updateProfile(foresterId: number, dto : UpdateForester) {
        const forester = await this.prisma.forester.findUnique({
            where: {
                id: foresterId
            }
        })

        if (!forester)
            throw new NotFoundException('Forester not found')

        return this.prisma.forester.update({
            where: {
                id: foresterId
            },
            data: {
                fullName: dto.fullName ?? forester.fullName,
                avatar: dto.avatar ?? forester.avatar,
                birthDate: dto.birthDate ? new Date(dto.birthDate) : forester.birthDate,
                gender: dto.gender ?? forester.gender
            }
        })
    }
}