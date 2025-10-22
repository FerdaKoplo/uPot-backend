import { Module } from "@nestjs/common";
import { ForestController } from "./forest.controller";
import { ForestService } from "./forest.service";

@Module({
    imports : [ForestController, ForestService],
    providers : [ForestService],
    exports : [ForestService]
})

export class ForestModule {}