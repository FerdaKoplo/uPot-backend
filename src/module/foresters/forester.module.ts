import { Module } from "@nestjs/common";
import { ForesterService } from "./forester.service";
import { ForesterController } from "./forester.controller";

@Module({
    imports : [ForesterService, ForesterController],
    providers : [ForesterService],
    exports : [ForesterService]
})

export class ForesterModule {}