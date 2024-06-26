import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {TransferService} from './transfer.service';
import {StatusInvitationDto} from "./dto/status-invitation.dto";
import {Roles} from "../auth/decorators/roles.decorator";
import {AuthRoles} from "../auth-roles";
import {InvitationDto} from "../notifications/letter/dto/invitation.dto";
import {FireDto} from "./dto/fire.dto";

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}

    @UsePipes(ValidationPipe)
    @Post('accept')
    async accept(@Body() statusInvitationDto: StatusInvitationDto) {
        return await this.transferService.accept(statusInvitationDto);
    }

    @UsePipes(ValidationPipe)
    @Post('fire')
    async fire(@Body() fireDto: FireDto) {
        console.log(fireDto);
        return await this.transferService.fire(fireDto);
    }

    @UsePipes(ValidationPipe)
    @Post('reject')
    async reject(@Body() statusInvitationDto: StatusInvitationDto) {
        return await this.transferService.reject(statusInvitationDto);
    }

    @Roles(AuthRoles.TRAINER, AuthRoles.DIRECTOR)
    @UsePipes(ValidationPipe)
    @Post('invitation')
    async invite(@Body() invitationDto: InvitationDto) {
        return await this.transferService.invite(invitationDto);
    }
}
