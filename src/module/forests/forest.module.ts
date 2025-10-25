import { Module } from "@nestjs/common";
import { ForestController } from "./forest.controller";
import { ForestService } from "./forest.service";
import { PrismaService } from "src/utils/prisma.service";

@Module({
    controllers : [ForestController],
    providers : [ForestService, PrismaService],
})

export class ForestModule {}