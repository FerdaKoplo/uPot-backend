// import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateLeafletDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsDateString()
    dueDate?: Date

    @IsInt()
    @Min(0)
    position: number

    @IsInt()
    twigId: number
}