import { IsNotEmpty, IsString } from "class-validator"

export class UpdatePositionDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    position: string
}