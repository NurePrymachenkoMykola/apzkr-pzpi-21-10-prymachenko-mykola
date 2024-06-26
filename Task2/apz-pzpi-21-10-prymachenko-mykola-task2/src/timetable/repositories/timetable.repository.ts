import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {EntityRepository} from "../../lib/global/repositories/entity.repository";
import {Timetable} from "../../schemas/timetable.schema";
import {Game} from "../../schemas/game.schema";
import {DeleteGameDto} from "../../game/dto/delete-game.dto";

@Injectable()
export class TimetableRepository extends EntityRepository<Timetable> {
    constructor(
        @InjectModel(Timetable.name) private timetableModel: Model<Timetable>
    ) {
        super(timetableModel);
    }

    async addGame(timetableId: string, game: Game) {
        const result = await this.update(
            {id: timetableId},
            {$addToSet: { games: [game._id]}}
        );
        return result;
    }

    async deleteGame(gameId: string) {
        const result = await this.update(
            {games: {$in: [gameId]}},
            {$pull: { games: {$in: [gameId]}}}
        );
        return result;
    }
}
