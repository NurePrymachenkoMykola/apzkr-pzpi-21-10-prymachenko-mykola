import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Medic} from "../../../schemas/members/medic.schema";
import {MemberRepositoryGeneric} from "../../repositories/member-generic.repository";

@Injectable()
export class MedicRepository extends MemberRepositoryGeneric<Medic> {
    constructor(
        @InjectModel(Medic.name) private medicModel: Model<Medic>
    ) {
        super(medicModel);
    }
}
