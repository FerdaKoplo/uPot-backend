import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { ForesterGender } from "generated/prisma";

export class UpdateForester {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    fullName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    avatar?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    birthDate?: string;

    @ApiProperty({ enum: ForesterGender, required: false })
    @IsOptional()
    @IsEnum(ForesterGender)
    gender?: ForesterGender;

}