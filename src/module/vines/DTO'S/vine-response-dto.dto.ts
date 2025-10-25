import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { Berry, Leaflet } from "generated/prisma";

export class VineResponseDTO {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string

    @ApiProperty()
    leafletId: number

    @ApiProperty()
    position: number

    // @ApiProperty({ type: Array, required: false, description: "List of leaflets under this vine" })
    // leaflets?: Leaflet[]

    @ApiProperty()
    @ApiProperty({ type: Array, required: false, description: "List of berries under this vine" })
    berries?: Berry[]

    @ApiProperty()
    createdAt?: Date | null

    @ApiProperty()
    updatedAt?: Date | null

    @ApiProperty()
    deletedAt?: Date
}