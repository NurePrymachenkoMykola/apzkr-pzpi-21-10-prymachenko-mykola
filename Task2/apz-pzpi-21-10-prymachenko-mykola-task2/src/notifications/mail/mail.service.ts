import {Injectable} from "@nestjs/common";
import {MailerService} from "@nestjs-modules/mailer";
import {LetterUser} from "../../schemas/contacts/letter.schema";
@Injectable()
export class MailService {

    constructor(
        private mailerService: MailerService
    ) {}

    async sendLetter(sender: LetterUser, receiver: LetterUser, title: string) {
        return await this.mailerService.sendMail({
            from: sender.email,
            to: receiver.email,
            subject: title,
            template: './letter',
            context: {
                sender_name: sender.name,
                sender_surname: sender.surname,
                receiver_name: receiver.name,
                receiver_surname: receiver.surname,
            },
        });
    }
}
