import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePollenGrainDTO {
    @IsInt()
    @IsNotEmpty()
    leafletId: number

    @IsInt()
    @IsNotEmpty()
    foresterId: number

    @IsString()
    @IsNotEmpty()
    fileName: string

    @IsString()
    @IsNotEmpty()
    fileURL: string

    @IsString()
    @IsOptional()
    fileType?: string
}