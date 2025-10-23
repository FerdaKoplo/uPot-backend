import { ApiProperty } from "@nestjs/swagger"

export class BackgroundUpdateResponseDTO {
    @ApiProperty({ required: false })
    backgroundImageUrl?: string | null

    @ApiProperty()
    updatedAt?: Date | null

    @ApiProperty()
    deletedAt?: Date | null
}