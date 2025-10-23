import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ForestService } from "./forest.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { FilterForestDTO } from "./DTO'S/filter-forest.dto";
import { CreateForestDTO } from "./DTO'S/create-forest.dto";
import { UpdateForestDTO } from "./DTO'S/update-forest.dto";
import { GetCurrentUser } from "src/common/decorator/current-user.decorator";

@ApiTags('Forest')
@ApiBearerAuth()
@Controller('forest')
@UseGuards(JwtAuthGuard)
export class ForestController {
    constructor(private readonly forestService: ForestService) { }

    @Get()
    async getUserForests(@GetCurrentUser('sub') foresterId: number, @Query() filter: FilterForestDTO) {
        return this.forestService.getUserForests(foresterId, filter)
    }

    @Get(':id')
    async getForestDetail(@GetCurrentUser('sub') foresterId: number, @Param('id', ParseIntPipe) id: number) {
        return this.forestService.getForestDetail(id, foresterId)
    }

    @Post()
    async createForest(@GetCurrentUser('sub') foresterId: number, @Body() dto: CreateForestDTO) {
        return this.forestService.createForest(dto, foresterId)
    }

    @Patch(':id')
    async updateForest(@GetCurrentUser('sub') foresterId: number, @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateForestDTO) {
        return this.forestService.updateForest(id, dto, foresterId)
    }

    @Delete(':id')
    async deleteForest(@GetCurrentUser('sub') foresterId: number, @Param('id', ParseIntPipe) id: number) {
        return this.forestService.deleteForest(id, foresterId)
    }

}