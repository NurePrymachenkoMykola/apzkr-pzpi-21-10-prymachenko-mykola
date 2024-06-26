import {Validate} from "class-validator";
import {TextField} from "../../lib/validation/text-field.validation";
import {IsDateFormat} from "../../lib/validation/is-date-format.validation";

export class CreateClubDto {
    @Validate(TextField, [0, 200])
    name: string;

    @Validate(TextField, [0, 200])
    selfDescription: string;

    @Validate(IsDateFormat)
    foundationDate: string;

    directorId: string;
}
