import {Roles} from "../../schemas/members/member.schema";
import {AuthRoles} from "../../auth-roles";


export class SignInDto {
    username: string;
    password: string;
    role: AuthRoles
}

export class AdminSignInDto {
    username: string;
    password: string;
}