import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTwigDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsInt()
    @IsNotEmpty()
    position: string

    @IsInt()
    branchId: number
}