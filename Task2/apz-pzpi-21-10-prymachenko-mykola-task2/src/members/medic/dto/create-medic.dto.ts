import {CreateMemberDto} from "../../dto/create-member.dto";
import {IsEmail, IsNotEmpty, IsPositive, Validate} from "class-validator";
import {IsUserAlreadyExist, UniqueProperties} from "../../../lib/validation/is-user-exist.validation";
import {Roles} from "../../../schemas/members/member.schema";
import {TextField} from "../../../lib/validation/text-field.validation";

export class CreateMedicDto extends CreateMemberDto {
    @IsPositive({message: 'Experience must be a positive number'})
    @IsNotEmpty({message: 'Experience field cannot be empty'})
    experience: number;

    @IsUserAlreadyExist({uniqueProperty: UniqueProperties.EMAIL, role: Roles.MEDIC})
    @IsEmail({}, {
        message: 'Email is not valid!'
    })
    email: string;

    @IsUserAlreadyExist({uniqueProperty: UniqueProperties.USERNAME, role: Roles.MEDIC})
    @Validate(TextField, [1, 20])
    username: string;
}
