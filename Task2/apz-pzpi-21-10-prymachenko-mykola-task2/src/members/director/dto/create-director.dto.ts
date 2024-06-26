import {CreateMemberDto} from "../../dto/create-member.dto";
import {IsUserAlreadyExist, UniqueProperties} from "../../../lib/validation/is-user-exist.validation";
import {IsEmail, Validate} from "class-validator";
import {Roles} from "../../../schemas/members/member.schema";
import {TextField} from "../../../lib/validation/text-field.validation";

export class CreateDirectorDto extends CreateMemberDto {
    @IsUserAlreadyExist({uniqueProperty: UniqueProperties.EMAIL, role: Roles.DIRECTOR})
    @IsEmail({}, {
        message: 'Email is not valid!'
    })
    email: string;

    @IsUserAlreadyExist({uniqueProperty: UniqueProperties.USERNAME, role: Roles.DIRECTOR})
    @Validate(TextField, [1, 20])
    username: string;
}
