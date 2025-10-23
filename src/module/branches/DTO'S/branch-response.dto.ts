import { ApiProperty } from "@nestjs/swagger";
import { Visibility } from "generated/prisma";

export class BranchResponseDTO {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string

    @ApiProperty({ required: true })
    visibility: Visibility

    @ApiProperty({ required: false })
    backgroundImageUrl?: string

    @ApiProperty()
    createdAt : Date

    @ApiProperty()
    updatedAt : Date

    @ApiProperty()
    deletedAt : Date

}