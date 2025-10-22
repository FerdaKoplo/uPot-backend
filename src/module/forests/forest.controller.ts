import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ForestService } from "./forest.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { FilterForestDTO } from "./DTO'S/filter-forest.dto";
import { CreateForestDTO } from "./DTO'S/create-forest.dto";
import { UpdateForestDTO } from "./DTO'S/update-forest.dto";

@ApiTags('Forest')
@ApiBearerAuth()
@Controller('forest')
@UseGuards(JwtAuthGuard)
export class ForestController {
    constructor(private readonly forestService: ForestService) { }

    @Get()
    async getUserForests(@Req() req, @Query() filter: FilterForestDTO) {
        const foresterId = req.user.sub
        return this.forestService.getUserForests(foresterId, filter)
    }

    @Get(':id')
    async getForestDetail(@Req() req, @Param('id') id: string) {
        const foresterId = req.user.sub
        return this.forestService.getForestDetail(Number(id), foresterId)
    }

    @Post()
    async createForest(@Body() dto: CreateForestDTO) {
        return this.forestService.createForest(dto)
    }

    @Patch(':id')
    async updateForest(@Param('id') id: string, @Body() dto: UpdateForestDTO) {
        return this.forestService.updateForest(Number(id), dto)
    }

    @Delete(':id')
    async deleteForest(@Param('id') id: string) {
        return this.forestService.deleteForest(Number(id))
    }

}