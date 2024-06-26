import { PartialType } from '@nestjs/mapped-types';
import {CreateGameDto, Score} from "./create-game.dto";
import {IsBoolean, IsEmpty, IsNotEmptyObject, IsObject, Validate, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {IsDateFormat} from "../../lib/validation/is-date-format.validation";

export class UpdateGameDto extends PartialType(CreateGameDto) {

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Score)
    score: Score
}
