import { Module } from "@nestjs/common";
import { BranchController } from "./branch.controller";
import { BranchService } from "./branch.service";
import { PrismaService } from "src/utils/prisma.service";

@Module({
    imports : [PrismaService],
    controllers : [BranchController],
    providers : [BranchService]
})

export class BranchModule { }