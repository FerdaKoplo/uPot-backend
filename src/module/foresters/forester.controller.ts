import { BadRequestException, Body, Controller, Patch, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ForesterService } from "./forester.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { UpdateForester } from "./DTO'S/update-forester.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Forester')
@ApiBearerAuth()
@Controller('forester')
export class ForesterController {
    constructor(private readonly foresterService: ForesterService) { }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('avatar', {
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
                cb(null, true)
            },
        }),
    )
    @Patch('profile')
    async updateProfile(
        @Req() req,
        @Body() dto: UpdateForester,
        @UploadedFile() file: Express.Multer.File,) {
        const foresterId = req.user.sub
        if (file) {
            dto.avatar = `/storages/avatars/${file.filename}`;
        }

        const updated = await this.foresterService.updateProfile(foresterId, dto);
        return {
            message: "Profile updated successfully",
            data: updated,
        }
    }
}