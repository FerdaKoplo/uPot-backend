import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { BranchService } from "./branch.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UpdateBranchDTO } from "./DTO'S/update-branch.dto";
import { CreateBranchDTO } from "./DTO'S/create-branch.dto";

@ApiTags('Branch')
@ApiBearerAuth()
@Controller('branch')
export class BranchController {

    constructor(private readonly branchService: BranchService) { }

    @Get(':forestId')
    async getBranchesByForest(@Param('forestId') forestId: string) {
        const id = parseInt(forestId)
        return this.branchService.getBranchByForest(id)
    }

    @Post(':branchId/background')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('backgroundImage', {
            storage: diskStorage({
                destination: './storages/avatars',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/^image\/(png|jpg|jpeg|webp)$/))
                    return cb(new BadRequestException("Only image files are allowed!"), false);
                cb(null, true);
            },
        })
    )

    async uploadBackgroundImage(
        @Param('branchId') branchId: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const imageUrl = `/storages/avatars/${file.filename}`;
        return this.branchService.addBackgroundImage(branchId, { backgroundImageUrl: imageUrl });
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createBranch(@Body() dto: CreateBranchDTO) {
        return this.branchService.createBranch(dto)
    }

    @Put(':branchId')
    @UseGuards(JwtAuthGuard)
    async updateBranch(
        @Param('branchId') branchId: string,
        @Body() dto: UpdateBranchDTO
    ) {
        return this.branchService.updateBranch(Number(branchId), dto)
    }

    @Delete(':branchId')
    @UseGuards(JwtAuthGuard)
    async deleteBranch(@Param('branchId') branchId: string) {
        return this.branchService.deleteBranch(Number(branchId))
    }

    @Delete(':branchId/background')
    @UseGuards(JwtAuthGuard)
    async deleteBackgroundImage(@Param('branchId') branchId: string) {
        return this.branchService.deleteBackgroundImage(Number(branchId))
    }

}