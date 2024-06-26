import {LetterUser} from "../../../schemas/contacts/letter.schema";


export class InvitationDto {
    sender: LetterUser;
    receiver: LetterUser;

}
