import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Director} from "../../../schemas/members/director.schema";
import {MemberRepositoryGeneric} from "../../repositories/member-generic.repository";

@Injectable()
export class DirectorRepository extends MemberRepositoryGeneric<Director> {
    constructor(
        @InjectModel(Director.name) private directorModel: Model<Director>
    ) {
        super(directorModel);
    }
}
