import {Roles} from "../../schemas/members/member.schema";
import {IsMongoId, IsNotEmpty, IsString} from "class-validator";

export class StatusInvitationDto {
    @IsNotEmpty()
    @IsString()
    directorUsername: string;

    @IsNotEmpty()
    @IsString()
    memberUsername: string;

    @IsNotEmpty()
    @IsString()
    role: Roles;

    @IsMongoId()
    @IsNotEmpty()
    letterId: string;
}