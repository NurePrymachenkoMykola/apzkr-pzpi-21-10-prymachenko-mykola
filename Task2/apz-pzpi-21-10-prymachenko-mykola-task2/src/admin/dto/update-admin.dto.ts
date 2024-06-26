import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import {IsStrongPassword, Validate} from "class-validator";
import {TextField} from "../../lib/validation/text-field.validation";

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @Validate(TextField, [1, 20])
    username: string;

    @IsStrongPassword({minLength: 6, minNumbers: 1, minUppercase: 1, minSymbols: 0},
        {message: 'Password is not strong enough!'})
    @Validate(TextField, [6, 20])
    password: string;
}
