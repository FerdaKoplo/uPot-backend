import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { TwigService } from "./twig.service";
import { CreateTwigDTO } from "./DTO'S/create-twig-dto.dto";
import { UpdateTwigDTO } from "./DTO'S/update-position-dto.dto";

@ApiTags('Twig')
@ApiBearerAuth()
@Controller('twig')
@UseGuards(JwtAuthGuard)
export class TwigController {
    constructor(private readonly twigService: TwigService) { }

    @Get('branch/:branchId')
    async getTwigs(@Param('branchId', ParseIntPipe) branchId: number) {
        return this.twigService.getTwigsByBranch(branchId)
    }

    @Get(':id')
    async getDetailTwig(@Param('branchId', ParseIntPipe) branchId: number, @Param('id', ParseIntPipe) id: number) {
        return this.twigService.getDetailTwig(branchId, id)
    }

    @Post()
    async createTwig(@Body() dto: CreateTwigDTO ){
        return this.twigService.createTwig(dto)
    }

    @Put(':id')
    async updateTwig(@Param('twigId') twigId : number, dto : UpdateTwigDTO) {
        return this.twigService.updateTwig(twigId, dto)
    }

    @Delete(':id')
    async deleteTwig(@Param() twigid : number){
        return this.twigService.deleteTwig(twigid)
    }
}