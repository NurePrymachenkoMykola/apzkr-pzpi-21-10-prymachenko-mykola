import {LetterType, LetterUser} from "../../../schemas/contacts/letter.schema";


export class CreateLetterDto {
    sender: LetterUser;
    receiver: LetterUser;

    title: string;
    content: {
        greeting: string,
        body: string,
        conclusion: string
    };
    type?: LetterType;
}
