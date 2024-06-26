import { Injectable } from '@nestjs/common';
import {FindMembersDto} from "../dto/find-members.dto";
import {EntityRepository} from "../../lib/global/repositories/entity.repository";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Member} from "../../schemas/members/member.schema";

const UnionCollections = [
    {
        $unionWith: {
            coll: 'players',
            pipeline: [{
                $addFields: {
                    'role': 'Player'
                }
            }]
        }
    },
    {
        $unionWith: {
            coll: 'medics',
            pipeline: [{
                $addFields: {
                    'role': 'Medic'
                }
            }]
        }
    },
    {
        $unionWith: {
            coll: 'trainers',
            pipeline: [{
                $addFields: {
                    'role': 'Trainer'
                }
            }]
        }
    },
    {
        $unionWith: {
            coll: 'directors',
            pipeline: [{
                $addFields: {
                    'role': 'Director'
                }
            }]
        }
    },
];

@Injectable()
export class MemberRepository extends EntityRepository<Member> {
    constructor(
        @InjectModel(Member.name) private memberModel: Model<Member>
    ) {
        super(memberModel);
    }

    async getMembers(findMembersDto: FindMembersDto) {
        let pipeline: any = [
            {
                $facet: {
                    'count': [
                        {
                            $unionWith: {
                                coll: 'players',
                            }
                        },
                        {
                            $unionWith: {
                                coll: 'medics',
                            }
                        },
                        {
                            $unionWith: {
                                coll: 'trainers',
                            }
                        },
                        {
                            $unionWith: {
                                coll: 'directors',
                            }
                        },
                        {
                            $count: 'count'
                        },
                    ],
                    'documents': [
                        ...UnionCollections,
                        {
                            $limit: +findMembersDto.limit + +findMembersDto.offset,
                        },
                        {
                            $skip: +findMembersDto.offset
                        },
                    ]
                }
            },
        ];
        const result = (await this.memberModel.aggregate(pipeline))[0];

        return {
            members: result.documents.filter(member => {
                if (findMembersDto.name) {
                    if (!member.name.toLowerCase().startsWith(findMembersDto.name.toLowerCase())) {
                        return false;
                    }
                }
                if (findMembersDto.surname) {
                    if (!member.surname.toLowerCase().startsWith(findMembersDto.surname.toLowerCase())) {
                        return false;
                    }
                }
                if (findMembersDto.role) {
                    if (member.role.toUpperCase() !== findMembersDto.role.toUpperCase()) {
                        return false;
                    }
                }
                return true;
            }),
            count: result.count[0].count
        };
    }

    async getMember(username: string) {
        const result = (await this.memberModel.aggregate([
            ...UnionCollections,
            {
                $match: {
                    username
                }
            },
        ]))[0];

        return result;
    }
}
