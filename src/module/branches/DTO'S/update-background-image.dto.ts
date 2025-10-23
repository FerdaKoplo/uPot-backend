import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateBackgroundImageDTO {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    backgroundImageUrl?: string
}