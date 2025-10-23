import { Module } from "@nestjs/common";
import { ForesterService } from "./forester.service";
import { ForesterController } from "./forester.controller";
import { PrismaService } from "src/utils/prisma.service";

@Module({
    imports : [PrismaService],
    providers : [ForesterService],
    exports : [ForesterService]
})

export class ForesterModule {}