import { Module } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { VineController } from "./vines.controller";
import { VinesService } from "./vines.service";

@Module({
    controllers : [VineController],
    providers : [VinesService, PrismaService]
})

export class VineModule {}