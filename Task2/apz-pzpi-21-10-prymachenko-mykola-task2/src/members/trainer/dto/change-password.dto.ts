import {Roles} from "../../../schemas/members/member.schema";

export class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
    username: string;
    role: Roles;
}