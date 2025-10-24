import { IsDateString, IsInt, IsOptional, IsString, Min } from "class-validator";

export class UpdateLeafletDTO {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsDateString()
    dueDate?: Date

    @IsOptional()
    @IsInt()
    @Min(0)
    position?: number
}