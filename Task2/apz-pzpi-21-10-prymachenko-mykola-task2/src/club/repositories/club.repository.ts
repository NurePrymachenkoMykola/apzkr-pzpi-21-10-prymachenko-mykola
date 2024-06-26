import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Club} from "../../schemas/club.schema";
import {EntityRepository} from "../../lib/global/repositories/entity.repository";
import {AdmitMemberDto} from "../dto/admit-member.dto";

@Injectable()
export class ClubRepository extends EntityRepository<Club> {
    constructor(
        @InjectModel(Club.name) private clubModel: Model<Club>
    ) {
        super(clubModel);
    }

    async updateSubscription(id: string, subscription: string) {
        const result =  await this.update({id}, {subscription});
        return result;
    }

    async admitPlayer(admitMemberDto: AdmitMemberDto) {
        const result = await this.update(
            {id: admitMemberDto.clubId},
            {$addToSet: {playersId: admitMemberDto.memberId}}
        )

        return result;
    }

    async firePlayer(clubId: string, playerId: string) {
        const result = await this.update(
            {id: clubId},
            {$pull: { playersId: {$in: [playerId]}}}
        )

        return result;
    }
}
