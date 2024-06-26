import {Module} from "@nestjs/common";
import {MailService} from "./mail.service";
import {MailerModule} from "@nestjs-modules/mailer";
import { join } from 'path';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
//cdlr fxob empa xtys
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "2c8552a8245909",
                    pass: "4c476c0644703b"
                }
                /*host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'sollitude.sky@gmail.com',
                    pass: 'cdlrfxobempaxtys'
                },
                tls: {
                    rejectUnauthorized: false
                }*/
            },
            defaults: {
                from: '"No Reply" <soul@gmail.com>'
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                }
            }
        })
    ],
    exports: [
      MailService
    ],
    providers: [MailService],
})
export class MailModule {}