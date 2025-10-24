import { ApiProperty } from "@nestjs/swagger";
import { Leaflet } from "generated/prisma";

export class TwigResponseDTO {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string

    @ApiProperty()
    position: number

    @ApiProperty()
    branchId: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt?: Date | null

    @ApiProperty()
    deletedAt?: Date

    leaflets?: Leaflet[]
}