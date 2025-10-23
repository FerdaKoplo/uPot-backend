import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Visibility } from "generated/prisma"

export class UpdateBranchDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsEnum(Visibility)
    @IsNotEmpty()
    visibility: Visibility
}