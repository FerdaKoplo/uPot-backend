import { Module } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { TwigService } from "./twig.service";
import { TwigController } from "./twig.controller";

@Module({
    providers : [TwigService, PrismaService],
    controllers : [TwigController],
})

export class TwigModule {}