import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Player} from "../../../schemas/members/player.schema";
import {FilterQuery, Model} from "mongoose";
import {MemberRepositoryGeneric} from "../../repositories/member-generic.repository";

@Injectable()
export class PlayerRepository extends MemberRepositoryGeneric<Player> {
    constructor(
        @InjectModel(Player.name) private playerModel: Model<Player>
    ) {
        super(playerModel);
    }
}
