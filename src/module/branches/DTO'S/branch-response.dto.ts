import { ApiProperty } from "@nestjs/swagger";
import { ForestEcho, Moss, Twig, Visibility } from "generated/prisma";

export class BranchResponseDTO {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string

    @ApiProperty({ required: true })
    visibility: Visibility

    @ApiProperty({ required: false })
    backgroundImageUrl?: string | null

    @ApiProperty()
    forestId: number

    @ApiProperty()
    createdAt?: Date | null

    @ApiProperty()
    updatedAt?: Date | null 

    @ApiProperty()
    deletedAt?: Date

    @ApiProperty({ type: [Number], required: false, description: "IDs of foresters (members) in the forest" })
    memberIds?: number[]

    @ApiProperty({ type: Array, required: false, description: "List of twigs under this branch" })
    twigs?: Twig[] 

    @ApiProperty({ type: Array, required: false, description: "List of mosses under this branch" })
    mosses?: Moss[]

    @ApiProperty({ type: Array, required: false, description: "List of forest echoes related to this branch" })
    forestEchoes?: ForestEcho[]

}