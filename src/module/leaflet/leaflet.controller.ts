import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { LeafletService } from "./leaflet.service";
import { CreateLeafletDTO } from "./DTO'S/create-leaflet-dto.dto";
import { UpdateLeafletDTO } from "./DTO'S/update-leaflet-dto.dto";

@ApiTags('Leaflet')
@Controller('leaflet')
@UseGuards(JwtAuthGuard)
export class LeafletController {
    constructor (private readonly leafletService : LeafletService) {}

    @Get()
    async getLeaflets(){
        return this.leafletService.getLeaflets()
    }

    @Get(':id')
    async getDetailLeaflet(@Param('id', ParseIntPipe) id : number ){
        return this.leafletService.getDetailLeaflet(id)
    }

    @Post()
    async createLeaflet(@Body() dto : CreateLeafletDTO){
        return this.leafletService.createLeaflet(dto)
    }

    @Put(':id')
    async updateLeaflet(@Param('id', ParseIntPipe) id : number, @Body() dto : UpdateLeafletDTO ){
        return this.leafletService.getDetailLeaflet(id)
    }

    @Delete(':id')
    async deleteLeaflet(@Param('id', ParseIntPipe) id : number){
        return this.leafletService.deleteLeaflet(id)
    }
}