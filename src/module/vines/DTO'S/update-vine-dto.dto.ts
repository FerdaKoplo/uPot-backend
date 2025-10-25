import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateVineDTO {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title: string

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    position: number

    @IsNumber()
    @IsNotEmpty()
    leafletId: number
}