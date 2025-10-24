import { ApiProperty } from "@nestjs/swagger";
import { Twig } from "generated/prisma";

export class LeafletResponseDTO {
    @ApiProperty()
    id: number

    @ApiProperty()
    description?: string | null

    @ApiProperty()
    due_date?: Date | null

    @ApiProperty()
    position: number

    @ApiProperty({ type: Array, required: false})
    twigs?: Twig[]

    @ApiProperty()
    createdAt?: Date | null

    @ApiProperty()
    updatedAt?: Date | null

    @ApiProperty()
    deletedAt?: Date | null
}