import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {EntityRepository} from "../../lib/global/repositories/entity.repository";
import {Game} from "../../schemas/game.schema";

@Injectable()
export class GameRepository extends EntityRepository<Game> {
    constructor(
        @InjectModel(Game.name) private gameModel: Model<Game>
    ) {
        super(gameModel);
    }

    async findAllInTimetable(ids: string[]) {
        const games = await this.gameModel.aggregate(
            [
                {
                    $addFields: {
                        ids
                    }
                },
                {$match: {ids: {$elemMatch: {$in: ids}}}},
                {
                    $project: {
                        id: '$_id',
                        _id: 0,
                        homeTeam: 1,
                        guestTeam: 1,
                        date: 1,
                        isTraining: 1,
                        score: 1
                    }
                }
            ]
        );
        return games;
    }
}
