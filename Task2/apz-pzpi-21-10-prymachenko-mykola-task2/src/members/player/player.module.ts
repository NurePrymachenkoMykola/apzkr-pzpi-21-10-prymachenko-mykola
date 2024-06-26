import { Module} from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Player, PlayerSchema} from "../../schemas/members/player.schema";
import {PlayerRepository} from "./repositories/player.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Player.name, schema: PlayerSchema}]),
    ],
    exports: [
        PlayerService
    ],
    controllers: [PlayerController],
    providers: [
      PlayerService,
      PlayerRepository
    ],
})
export class PlayerModule {}
