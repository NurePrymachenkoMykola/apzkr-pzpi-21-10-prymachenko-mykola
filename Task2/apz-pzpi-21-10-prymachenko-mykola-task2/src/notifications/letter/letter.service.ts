import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {LetterRepository} from "./repositories/letter.repository";
import {CreateLetterDto} from "./dto/create-letter.dto";
import {UpdateLetterDto} from "./dto/update-letter.dto";
import {DeleteLetterDto} from "./dto/delete-letter.dto";
import {MailService} from "../mail/mail.service";
import {MemberService} from "../../members/member.service";
import {InvitationDto} from "./dto/invitation.dto";
import {invitationContent} from "./templates/invitation.template";
import {LetterType} from "../../schemas/contacts/letter.schema";

@Injectable()
export class LetterService {

    constructor(
        private letterRepository: LetterRepository,
        private mailService: MailService,
        private memberService: MemberService
    ) {}

    async create(createLetterDto: CreateLetterDto) {
        createLetterDto['date'] = new Date();
        if (!createLetterDto.type) {
            createLetterDto.type = LetterType.DEFAULT;
        }
        const letter = await this.letterRepository.create(createLetterDto)
        return letter;
    }

    async find(receiverUsername: string) {
        const letters = await this.letterRepository.findByReceiver(receiverUsername)
        return letters;
    }
    async update(id: string, updateLetterDto: UpdateLetterDto) {
        const letter = await this.letterRepository.update({id}, updateLetterDto)
        return letter;
    }
    async delete(deleteLetterDto: DeleteLetterDto) {
        const letter = await this.letterRepository.delete(deleteLetterDto);
        const receiver = await this.memberService.findOne(letter.receiver.username);
        await this.memberService.getMemberService(receiver.role).removeLetter(letter.receiver.username, letter._id.toString());
        return letter;
    }

    async sendLetter(createLetterDto: CreateLetterDto) {
        let letterId: string;
        try {
            const letter = await this.create(createLetterDto);
            letterId = letter._id.toString();
            const result = await this.memberService.getMemberService(letter.receiver.role).receiveLetter(letter);
            if (!result) {
                await this.delete({id: letter._id.toString()})
                throw new InternalServerErrorException('Some error during sending letter, try again!');
            }
            const resultSendingEmail = await this.mailService.sendLetter(letter.sender, letter.receiver, letter.title);
            if (!resultSendingEmail) {
                throw new InternalServerErrorException('Some error during sending letter, try again!');
            }

            return letter;
        } catch (e) {
            if (letterId) {
                await this.delete({id: letterId});
            }
            console.log('e', e);
            throw e;
        }
    }

    async invite(createInvitationDto: InvitationDto) {
        const club = await this.memberService.getClub(createInvitationDto.sender.username);
        return await this.sendLetter({
            ...createInvitationDto,
            title: 'Invitation to club',
            content: invitationContent({createInvitationDto, club: club.name}),
            type: LetterType.INVITATION
        });
    }

    async toggleStatus(id: string, status: boolean) {
        try {
            return await this.update(
                id,
                {isRead: status}
            )
        } catch (e) {
            return e;
        }
    }
}
