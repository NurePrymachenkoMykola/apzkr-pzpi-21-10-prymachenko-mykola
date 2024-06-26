import {AuthRoles} from "../../auth-roles";

export class PayloadDto {
    username: string;
    role: AuthRoles;
    email?: string;
    name?: string;
    surname?: string;
}