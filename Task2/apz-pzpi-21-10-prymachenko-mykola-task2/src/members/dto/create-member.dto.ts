import {IsMongoId, IsStrongPassword, Validate, ValidateIf} from "class-validator";
import {TextField} from "../../lib/validation/text-field.validation";
import {IsDateFormat} from "../../lib/validation/is-date-format.validation";

export class CreateMemberDto {
    @Validate(TextField, [2, 20])
    name: string;

    @Validate(TextField, [2, 20])
    surname: string;

    @IsStrongPassword({minLength: 6, minNumbers: 1, minUppercase: 1, minSymbols: 0},
        {message: 'Password is not strong enough!'})
    @Validate(TextField, [6, 20])
    password: string;

    @Validate(TextField, [4, 30])
    nation: string;

    @Validate(IsDateFormat)
    birthday: string;

    @Validate(TextField, [0, 200, true])
    selfDescription: string;

    @IsMongoId()
    @ValidateIf((object, value) => value)
    clubId?: string | null;
}