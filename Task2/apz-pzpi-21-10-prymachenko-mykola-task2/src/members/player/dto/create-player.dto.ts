import {CreateMemberDto} from "../../dto/create-member.dto";
import {Prop} from "@nestjs/mongoose";
import {IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min, Validate} from "class-validator";
import {IsUserAlreadyExist, UniqueProperties} from "../../../lib/validation/is-user-exist.validation";
import {Roles} from "../../../schemas/members/member.schema";
import {TextField} from "../../../lib/validation/text-field.validation";

export enum Positions {

}
export class CreatePlayerDto extends CreateMemberDto {
    @IsString({message: 'Position must be a string'})
    @Length(2, 3, {message: 'Position must consist of 2 or 3 symbols'})
    @IsNotEmpty({message: 'Position field cannot be empty'})
    position: string;

    @IsNumber({}, {message: 'Number of footballer must be a number'})
    @IsNotEmpty({message: 'Number cannot be empty'})
    @Min(1, {message: 'Number cannot be less than 1'})
    @Max(99, {message: 'Number cannot be more than 99'})
    number: number;

    @IsUserAlreadyExist({uniqueProperty: UniqueProperties.EMAIL, role: Roles.PLAYER})
    @IsEmail({}, {
        message: 'Email is not valid!'
    })
    email: string;

    @IsUserAlreadyExist({uniqueProperty: UniqueProperties.USERNAME, role: Roles.PLAYER})
    @Validate(TextField, [1, 20]) 
    username: string;
}
