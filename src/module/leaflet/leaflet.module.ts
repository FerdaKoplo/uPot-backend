import { Module } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";
import { LeafletController } from "./leaflet.controller";
import { LeafletService } from "./leaflet.service";

@Module({
    controllers : [LeafletController],
    providers : [LeafletService, PrismaService]
})

export class LeafletModule {}