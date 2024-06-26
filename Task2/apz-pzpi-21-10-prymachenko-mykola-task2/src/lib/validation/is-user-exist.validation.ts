import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import {Injectable} from "@nestjs/common";
import {Roles} from "../../schemas/members/member.schema";
import {DirectorService} from "../../members/director/director.service";
import {MedicService} from "../../members/medic/medic.service";
import {PlayerService} from "../../members/player/player.service";
import {TrainerService} from "../../members/trainer/trainer.service";
import {MemberAbstractService} from "../../members/member.abstract.service";

export enum UniqueProperties {
    EMAIL = 'email',
    USERNAME = 'username'
}
export class UserOptions {
    role: Roles;
    uniqueProperty: UniqueProperties;
}
@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
    implements ValidatorConstraintInterface
{
    private memberServices: Record<string, MemberAbstractService> = {};
    constructor(
        private playerService: PlayerService,
        private trainerService: TrainerService,
        private medicService: MedicService,
        private directorService: DirectorService,
    ) {
        this.memberServices[Roles.PLAYER] = this.playerService;
        this.memberServices[Roles.TRAINER] = this.trainerService;
        this.memberServices[Roles.MEDIC] = this.medicService;
        this.memberServices[Roles.DIRECTOR] = this.directorService;
    }

    async validate(property: string, args?: ValidationArguments) {
        const options: UserOptions = args.constraints[0];
        const user = await this.memberServices[options.role].findOne({[options.uniqueProperty]: property});
        return !user;
    }

    defaultMessage(args: ValidationArguments) {
        const message = `User with such a ${args.constraints[0].uniqueProperty} already exist!`;
        return message;
    }}

export function IsUserAlreadyExist(options: UserOptions, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}