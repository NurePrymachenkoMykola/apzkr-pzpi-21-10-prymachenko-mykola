import {BadRequestException, Injectable} from '@nestjs/common';
import {StatusInvitationDto} from "./dto/status-invitation.dto";
import {ClubService} from "../club/club.service";
import {LetterService} from "../notifications/letter/letter.service";
import {MemberService} from "../members/member.service";
import {InvitationDto} from "../notifications/letter/dto/invitation.dto";
import {FireDto} from "./dto/fire.dto";

@Injectable()
export class TransferService {
    constructor(
        private memberService: MemberService,
        private clubService: ClubService,
        private letterService: LetterService
    ) {}

    async accept(statusInvitationDto: StatusInvitationDto) {
        const club = await this.memberService.getClub(statusInvitationDto.directorUsername);
        const member = await this.memberService
            .getMemberService(statusInvitationDto.role)
            .findOne({username: statusInvitationDto.memberUsername});
        switch (statusInvitationDto.role) {
            case 'DIRECTOR':
                await this.clubService.admitDirector({memberId: member._id.toString(), clubId: club._id.toString()});
                break;
            case 'TRAINER':
                await this.clubService.admitTrainer({memberId: member._id.toString(), clubId: club._id.toString()});
                break;
            case 'MEDIC':
                await this.clubService.admitMedic({memberId: member._id.toString(), clubId: club._id.toString()});
                break;
            case 'PLAYER':
                await this.clubService.admitPlayer({memberId: member._id.toString(), clubId: club._id.toString()});
                break;
        }

        const resultOfJoining = await this.memberService.getMemberService(statusInvitationDto.role).joinToClub(member.username, club._id.toString());
        if (!resultOfJoining) {
            throw new BadRequestException('Joining to club has failed...');
        }
        const resultOfDeletingLetter= await this.letterService.delete({id: statusInvitationDto.letterId});

        if (!resultOfDeletingLetter) {
            throw new BadRequestException('Deleting the letter has failed...');
        }

        return resultOfDeletingLetter;
    }

    async fire(fireDto: FireDto) {
        switch (fireDto.role) {
            case 'DIRECTOR':
                await this.clubService.fireDirector(fireDto.clubId);
                break;
            case 'TRAINER':
                await this.clubService.fireTrainer(fireDto.clubId);
                break;
            case 'MEDIC':
                await this.clubService.fireMedic(fireDto.clubId);
                break;
            case 'PLAYER':
                await this.clubService.firePlayer(fireDto.clubId, fireDto.memberId);
                break;
        }

        await this.memberService.getMemberService(fireDto.role).fireFromClub(fireDto.memberId);

        return {
            success: true
        }
    }

    async invite(invitationDto: InvitationDto) {
        return await this.letterService.invite(invitationDto);
    }

    async reject(statusInvitationDto: StatusInvitationDto) {
        const res = await this.letterService.delete({id: statusInvitationDto.letterId});
        if (!res) {
            throw new BadRequestException('Deleting the letter has failed...');
        }
        return res;
    }
}
