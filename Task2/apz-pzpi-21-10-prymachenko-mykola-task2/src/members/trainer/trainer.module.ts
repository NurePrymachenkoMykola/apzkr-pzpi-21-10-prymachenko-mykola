import { Module} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Trainer, TrainerSchema} from "../../schemas/members/trainer.schema";
import {TrainerRepository} from "./repositories/trainer.repository";
import {MailModule} from "../../notifications/mail/mail.module";
import {ClubModule} from "../../club/club.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Trainer.name, schema: TrainerSchema}]),
        ClubModule,
        MailModule,
    ],
    exports: [
        TrainerService
    ],
    controllers: [TrainerController],
    providers: [TrainerService, TrainerRepository],
})
export class TrainerModule {}
