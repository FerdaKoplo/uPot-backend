import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateTwigDTO {
    @IsString()
    @IsOptional()
    title: string

    @IsInt()
    @IsOptional()
    position: number
}