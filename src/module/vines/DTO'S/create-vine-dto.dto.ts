import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVineDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsNumber()
    @IsNotEmpty()
    position : number

    @IsNumber()
    @IsNotEmpty()
    leafletId : number
}