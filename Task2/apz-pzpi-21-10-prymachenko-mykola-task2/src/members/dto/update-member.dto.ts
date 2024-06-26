import {IsEmail, IsMongoId, IsStrongPassword, Validate} from "class-validator";
import {TextField} from "../../lib/validation/text-field.validation";
import {IsDateFormat} from "../../lib/validation/is-date-format.validation";
import {PartialType} from "@nestjs/mapped-types";
import {CreateMemberDto} from "./create-member.dto";

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
    @Validate(TextField, [2, 20])
    name?: string;

    @Validate(TextField, [2, 20])
    surname?: string;

    @IsStrongPassword({minLength: 6, minNumbers: 1, minUppercase: 1, minSymbols: 0},
        {message: 'Password is not strong enough!'})
    @Validate(TextField, [6, 20])
    password?: string;

    @Validate(TextField, [4, 30])
    nation?: string;

    @Validate(IsDateFormat)
    birthday?: string;

    @Validate(TextField, [0, 200])
    selfDescription?: string;
}