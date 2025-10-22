import { ApiProperty } from "@nestjs/swagger";
// import { ForestMember } from "generated/prisma";

export class ForestDTO {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty({ required: false })
    description?: string

    @ApiProperty()
    createdAt: Date

    @ApiProperty({ required: false, type: [Number] })
    memberIds?: number[]
    // membr : ForestMember

    @ApiProperty({ required: false, type: [Number] })
    branchIds?: number[]

    @ApiProperty({ required: false, type: [Number] })
    foresterRoleIds?: number[]
}