import {Roles} from "../../schemas/members/member.schema";

export class FireDto {
    memberId: string;
    clubId: string;
    role: Roles;
}