import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import * as process from "process";
import {LetterModule} from "./notifications/letter/letter.module";
import {BoardModule} from "./ws/board/board.module";
import { ClubModule } from './club/club.module';
import { AdminModule } from './admin/admin.module';
import { TimetableModule } from './timetable/timetable.module';
import { GameModule } from './game/game.module';
import {IsUserAlreadyExistConstraint} from "./lib/validation/is-user-exist.validation";
import {MemberModule} from "./members/member.module";
import { TransferModule } from './transfer/transfer.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './envs/.env',
        }),
        MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongolearning.d3ynaha.mongodb.net/soul`),
        MemberModule,
        AuthModule,
        LetterModule,
        BoardModule,
        ClubModule,
        AdminModule,
        TimetableModule,
        GameModule,
        TransferModule,
        SubscriptionModule,
    ],
    controllers: [],
    providers: [IsUserAlreadyExistConstraint],
})
export class AppModule {}
