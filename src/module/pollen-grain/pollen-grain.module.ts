import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma.service";

@Injectable()
export class PollenGrainService {
    constructor (private readonly prisma : PrismaService) {}

    
}