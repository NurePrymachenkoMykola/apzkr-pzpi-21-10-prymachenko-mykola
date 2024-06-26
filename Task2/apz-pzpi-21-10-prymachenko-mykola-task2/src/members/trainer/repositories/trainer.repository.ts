import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Trainer} from "../../../schemas/members/trainer.schema";
import {MemberRepositoryGeneric} from "../../repositories/member-generic.repository";

@Injectable()
export class TrainerRepository extends MemberRepositoryGeneric<Trainer> {
    constructor(
        @InjectModel(Trainer.name) private trainerModel: Model<Trainer>
    ) {
        super(trainerModel);
    }
}
