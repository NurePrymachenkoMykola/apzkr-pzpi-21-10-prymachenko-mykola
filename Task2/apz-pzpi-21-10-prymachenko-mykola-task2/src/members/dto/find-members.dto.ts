import {Roles} from "../../schemas/members/member.schema";

export class FindMembersDto {
    limit: number;
    offset: number;
    username?: string;
    name?: string;
    surname?: string;
    role?: Roles;
    clubId?: string
}