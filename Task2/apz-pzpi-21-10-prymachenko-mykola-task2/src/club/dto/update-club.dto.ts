import { PartialType } from '@nestjs/mapped-types';
import { CreateClubDto } from './create-club.dto';
import {IsString, MaxLength} from "class-validator";

export class UpdateClubDto extends PartialType(CreateClubDto) {
    @IsString({message: 'Name must be a string'})
    @MaxLength(20, {
        message: 'Name of a club cannot be longer than 20 symbols'
    })
    name: string;

    @IsString({message: 'Description must be a string'})
    @MaxLength(200, {
        message: 'Description of a club cannot be longer than 200 symbols'
    })
    selfDescription: string;
}
