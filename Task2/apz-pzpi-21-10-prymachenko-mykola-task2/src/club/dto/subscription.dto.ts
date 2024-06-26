import {
    IsMongoId,
    IsNotEmpty,
    IsNumber, IsNumberString,
    IsPositive,
    IsString,
    Length,
    Max, Min,
    Validate,
    ValidateNested
} from "class-validator";
import {Type} from "class-transformer";
import {TextField} from "../../lib/validation/text-field.validation";

export class Card {
    @Validate(TextField, [16, 16])
    @IsNumberString({}, {message: 'Number of card must contain only digits!'})
    number: string;

    @IsPositive({message: 'Expiration month must be positive number!'})
    @IsNotEmpty({message: 'Expiration month must not be empty!'})
    @Max(12, {message: 'Expiration month must be a valid month!'})
    @Min(1, {message: 'Expiration month must be valid month!'})
    exp_month: number;

    @IsPositive({message: 'Expiration year must be positive number!'})
    @IsNotEmpty({message: 'Expiration year must not be empty!'})
    @Min(Number.parseFloat(new Date().getFullYear().toString().slice(0, 2)), {message: 'Expiration year must be later than current year!'})
    exp_year: number;

    @IsNumberString({no_symbols: true}, {message: 'CVC is not valid'})
    @IsNotEmpty({message: 'CVC must not be empty'})
    @Length(3, 3, {message: 'CVC must contain 3 symbols'})
    cvc: string;
}

export class SubscriptionDto {
    @IsPositive()
    @IsNotEmpty()
    seasons: number;

    @ValidateNested()
    @Type(() => Card)
    card: Card;

    @IsMongoId()
    directorId: string;
}