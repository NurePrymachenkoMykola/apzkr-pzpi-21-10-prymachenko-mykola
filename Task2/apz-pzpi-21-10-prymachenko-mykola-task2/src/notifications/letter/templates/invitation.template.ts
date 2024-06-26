import {InvitationDto} from "../dto/invitation.dto";

interface InvitationContentProps {
    createInvitationDto: InvitationDto,
    club: string
}
export function invitationContent({
                                      createInvitationDto,
                                      club
                                  }: InvitationContentProps) {
    const text = {
        greeting: '',
        body: '',
        conclusion: ''
    };

    text.greeting = `Hello, ${createInvitationDto.receiver.name} ${createInvitationDto.receiver.surname}`;
    text.body = `I am director of ${club}. I officially invite you to out team. You are an excellent professional so we would be happy to see you with us.`;
    text.conclusion = `Best regards, ${createInvitationDto.sender.name} ${createInvitationDto.sender.surname}`;

    return text;
}