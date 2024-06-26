import {
    IsBoolean, IsEmpty,
    IsMongoId,
    IsNotEmpty,
    IsNotEmptyObject, IsNumber,
    IsObject,
    IsPositive,
    IsString,
    Validate,
    ValidateNested
} from "class-validator";
import {Type} from "class-transformer";
import {IsDateFormat} from "../../lib/validation/is-date-format.validation";
import {TextField} from "../../lib/validation/text-field.validation";

export class Score {
    @IsNumber({}, {
        message: 'Score must contain only positive number!',
    })
    homeTeam: number;

    @IsNumber({}, {message: 'Score must contain only positive number!'})
    guestTeam: number;
}
export class CreateGameDto {

    @IsNotEmpty()
    @Validate(IsDateFormat)
    date: string;

    @ValidateNested()
    @Type(() => Score)
    score: Score;

    @IsNotEmpty()
    @IsMongoId()
    clubId: string;

    @IsNotEmpty()
    @IsBoolean()
    isTraining: boolean;

    @Validate(TextField, [0, 50, true])
    homeTeam: string;

    @Validate(TextField, [0, 50, true])
    guestTeam: string;
}
