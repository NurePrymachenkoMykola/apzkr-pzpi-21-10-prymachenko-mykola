import {forwardRef, Module} from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import {ClubRepository} from "./repositories/club.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Club, ClubSchema} from "../schemas/club.schema";
import {TimetableModule} from "../timetable/timetable.module";
import {PaymentModule} from "../payment/payment.module";
import {SubscriptionModule} from "../subscription/subscription.module";
import {DirectorModule} from "../members/director/director.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Club.name, schema: ClubSchema}]),
        TimetableModule,
        PaymentModule,
        SubscriptionModule,
        forwardRef(() => DirectorModule),
    ],
    controllers: [ClubController],
    exports: [ClubService],
    providers: [
        ClubService,
        ClubRepository,
    ],
})
export class ClubModule {}
