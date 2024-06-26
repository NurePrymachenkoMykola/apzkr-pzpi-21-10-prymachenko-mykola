import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import {AdminRepository} from "./repositories/admin.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Admin, AdminSchema} from "../schemas/admin.schema";
import {LetterModule} from "../notifications/letter/letter.module";
import {PlayerModule} from "../members/player/player.module";
import {MailModule} from "../notifications/mail/mail.module";
import {MedicModule} from "../members/medic/medic.module";
import redisConnect from "../lib/redis.connection";
import redisConnection from "../lib/redis.connection";
import {SubscriptionModule} from "../subscription/subscription.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}]),
        MedicModule,
        LetterModule,
        PlayerModule,
        MailModule,
        SubscriptionModule
    ],
    exports: [AdminService],
    controllers: [AdminController],
    providers: [
        AdminService,
        AdminRepository,
    ],
})
export class AdminModule {}
