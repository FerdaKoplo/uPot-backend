import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class FilterForestDTO {
    @ApiProperty({ description: 'Search keyword for forest name', required: false })
    @IsOptional()
    @IsString()
    search?: string

    @ApiProperty({ description: 'Page number for pagination', required: false, default: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number = 1

    @ApiProperty({ description: 'Number of items per page', required: false, default: 10 })
    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number = 10
}