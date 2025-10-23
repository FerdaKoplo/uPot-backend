import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, isNumber, IsString } from "class-validator";
import { Visibility } from "generated/prisma";

export class CreateBranchDTO {
    
    @ApiProperty()
    @IsNumber()
    forestId : number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title : string

    @ApiProperty()
    @IsEnum(Visibility)
    @IsNotEmpty()
    visibility : Visibility


}