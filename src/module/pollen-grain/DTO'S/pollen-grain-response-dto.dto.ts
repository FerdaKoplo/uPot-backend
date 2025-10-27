import { ApiProperty } from "@nestjs/swagger";

export class PollenGrainResponseDTO {
    @ApiProperty()
    id: number

    @ApiProperty()
    leafletId : number

    @ApiProperty()
    foresterId : number

    @ApiProperty()
    fileName: string

    @ApiProperty()
    fileURL: string

    @ApiProperty()
    fileType?: string | null

    @ApiProperty()
    uploadedAt: Date

    @ApiProperty()
    updatedAt?: Date | null

    @ApiProperty()
    deletedAt?: Date | null

}