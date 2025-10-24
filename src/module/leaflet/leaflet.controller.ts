import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { LeafletService } from "./leaflet.service";

@ApiTags('Leaflet')
@Controller('leaflet')
@UseGuards(JwtAuthGuard)
export class LeafletController {
    constructor (private readonly leafletService : LeafletService) {}

    
}