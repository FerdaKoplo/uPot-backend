import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { TwigResponseDTO } from "./DTO'S/twig-response-dto.dto";

@Injectable()
export class TwigService {
    constructor(private readonly prisma: PrismaService) { }

    async getTwigsByBranch(branchId: number): Promise<TwigResponseDTO[]> {

        const twigs = await this.prisma.twig.findMany({
            where: {
                branchId,
                deletedAt: null
            },
            include : {
                leaflets : true
            }

        })
        return twigs.map(twig => ({
            id: twig.id,
            title: twig.title,
            position: twig.position,
            branchId: twig.branchId,
            createdAt: twig.createdAt,
            updatedAt: twig.updatedAt ?? undefined,
            leaflets : twig.leaflets
        }))
    }
}