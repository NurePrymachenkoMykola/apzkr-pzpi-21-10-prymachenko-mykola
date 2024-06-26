import { Module} from '@nestjs/common';
import { LetterService } from './letter.service';
import {LetterRepository} from "./repositories/letter.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Letter, LetterSchema} from "../../schemas/contacts/letter.schema";
import {LetterController} from "./letter.controller";
import {PlayerModule} from "../../members/player/player.module";
import {TrainerModule} from "../../members/trainer/trainer.module";
import {DirectorModule} from "../../members/director/director.module";
import {MedicModule} from "../../members/medic/medic.module";
import {MailModule} from "../mail/mail.module";
import {MemberModule} from "../../members/member.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Letter.name, schema: LetterSchema}]),
        PlayerModule,
        TrainerModule,
        DirectorModule,
        MedicModule,
        MailModule,
        MemberModule
    ],
    exports: [LetterService],
    controllers: [LetterController],
    providers: [LetterService, LetterRepository],
})
export class LetterModule {}
