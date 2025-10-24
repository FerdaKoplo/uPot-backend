import { Module } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { TwigService } from "./twig.service";
import { TwigController } from "./twig.controller";

@Module({
    imports: [PrismaService],
    providers : [TwigService],
    controllers : [TwigController],
    exports : [TwigController, TwigService]
})

export class TwigModule { }