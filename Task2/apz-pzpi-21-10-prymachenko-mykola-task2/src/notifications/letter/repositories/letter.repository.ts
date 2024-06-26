import { Injectable } from '@nestjs/common';
import {InjectModel, Prop} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {EntityRepository} from "../../../lib/global/repositories/entity.repository";
import {Letter} from "../../../schemas/contacts/letter.schema";

@Injectable()
export class LetterRepository extends EntityRepository<Letter> {
    constructor(
        @InjectModel(Letter.name) private letterModel: Model<Letter>
    ) {
        super(letterModel);
    }

    async findByReceiver(username: string) {
        const letters = await this.letterModel.aggregate([
            {
                $match: {
                    'receiver.username': username
                }
            },
            {
                $project: {
                    id: '$_id',
                    _id: 0,
                    sender: 1,
                    receiver: 1,
                    title: 1,
                    type: 1,
                    content: 1,
                    isRead: 1,
                    date: 1,
                }
            }
        ]);

        return letters;
    }
}
