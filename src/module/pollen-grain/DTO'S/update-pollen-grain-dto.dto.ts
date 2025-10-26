import { IsOptional, IsString } from "class-validator";

export class UpdatePollenGrainDTO {
    @IsString()
    @IsOptional()
    fileName?: string;

    @IsString()
    @IsOptional()
    fileUrl?: string;

    @IsString()
    @IsOptional()
    fileType?: string;

    @IsString()
    @IsOptional()
    description?: string
}