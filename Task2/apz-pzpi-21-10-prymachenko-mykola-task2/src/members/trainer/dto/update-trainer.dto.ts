import {UpdateMemberDto} from "../../dto/update-member.dto";
import {IsEmail, IsNotEmpty, IsPositive, Validate} from "class-validator";
import {IsUserAlreadyExist, UniqueProperties} from "../../../lib/validation/is-user-exist.validation";
import {Roles} from "../../../schemas/members/member.schema";
import {TextField} from "../../../lib/validation/text-field.validation";

export class UpdateTrainerDto extends UpdateMemberDto {

    @IsUserAlreadyExist({uniqueProperty: UniqueProperties.EMAIL, role: Roles.TRAINER})
    @IsEmail({}, {
        message: 'Email is not valid!'
    })
    email: string;

    @IsUserAlreadyExist({uniqueProperty: UniqueProperties.USERNAME, role: Roles.TRAINER})
    @Validate(TextField, [1, 20])
    username: string;

    @IsPositive({message: 'Experience must be a positive number'})
    @IsNotEmpty({message: 'Experience field cannot be empty'})
    experience: number;
}
