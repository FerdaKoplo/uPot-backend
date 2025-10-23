import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AddBackgroundImageDTO {
    @ApiProperty({ description : 'url of the background image', required: false })
    @IsString()
    @IsOptional()
    backgroundImageUrl?: string
}