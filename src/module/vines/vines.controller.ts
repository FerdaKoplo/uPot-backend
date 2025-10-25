import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { VinesService } from "./vines.service";
import { CreateVineDTO } from "./DTO'S/create-vine-dto.dto";
import { UpdateVineDTO } from "./DTO'S/update-vine-dto.dto";

@ApiTags('Vine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('leaflet/:leafletId/vine')
export class VineController {
    constructor(private readonly vineService: VinesService) { }

    @Get()
    async getVines(@Param('leafletId', ParseIntPipe) leafletId: number) {
        return this.vineService.getVinesbyLeaflet(leafletId);
    }

    @Get(':vineId')
    async getDetailVine(@Param('vineId', ParseIntPipe) vineId: number) {
        return this.vineService.getDetailVine(vineId);
    }

    @Post()
    async createVine(
        @Param('leafletId', ParseIntPipe) leafletId: number,
        @Body() dto: CreateVineDTO,
    ) {
        return this.vineService.createVine(leafletId, dto);
    }

    @Put(':vineId')
    async updateVine(
        @Param('leafletId', ParseIntPipe) leafletId: number,
        @Param('vineId', ParseIntPipe) vineId: number,
        @Body() dto: UpdateVineDTO,
    ) {
        return this.vineService.updateVine(leafletId, vineId, dto);
    }

    @Delete(':vineId')
    async deleteVine(
        @Param('leafletId', ParseIntPipe) leafletId: number,
        @Param('vineId', ParseIntPipe) vineId: number,
    ) {
        return this.vineService.deleteVine(leafletId, vineId);
    }
}