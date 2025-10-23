import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Visibility } from "generated/prisma";

export class CreateBranchDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title : string

    @ApiProperty()
    @IsEnum(Visibility)
    @IsNotEmpty()
    visibility : Visibility
}