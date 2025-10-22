import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateForestDTO {
    @ApiProperty({ description: 'Name of the forest' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Optional description of the forest', required: false })
    @IsOptional()
    @IsString()
    description?: string
}