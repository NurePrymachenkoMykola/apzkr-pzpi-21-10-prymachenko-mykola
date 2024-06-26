import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectorDto } from './create-director.dto';
import {UpdateMemberDto} from "../../dto/update-member.dto";
import {IsUserAlreadyExist, UniqueProperties} from "../../../lib/validation/is-user-exist.validation";
import {Roles} from "../../../schemas/members/member.schema";
import {IsEmail, IsEmpty, Validate} from "class-validator";
import {TextField} from "../../../lib/validation/text-field.validation";

export class UpdateDirectorDto extends UpdateMemberDto {

}
