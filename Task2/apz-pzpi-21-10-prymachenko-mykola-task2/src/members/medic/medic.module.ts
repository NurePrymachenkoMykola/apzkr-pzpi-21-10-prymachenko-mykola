import {Module} from '@nestjs/common';
import { MedicService } from './medic.service';
import { MedicController } from './medic.controller';
import {MedicRepository} from "./repositories/medic.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Medic, MedicSchema} from "../../schemas/members/medic.schema";
import {MailModule} from "../../notifications/mail/mail.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Medic.name, schema: MedicSchema}]),
        MailModule,
    ],
    exports: [
        MedicService,
    ],
    controllers: [MedicController],
    providers: [MedicService, MedicRepository],
})
export class MedicModule {}
