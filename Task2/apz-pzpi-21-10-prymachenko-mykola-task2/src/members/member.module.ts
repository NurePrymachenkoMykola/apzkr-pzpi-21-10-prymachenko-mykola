import {forwardRef, Module} from '@nestjs/common';
import {PlayerModule} from "./player/player.module";
import {TrainerModule} from "./trainer/trainer.module";
import {DirectorModule} from "./director/director.module";
import {MedicModule} from "./medic/medic.module";
import {LetterModule} from "../notifications/letter/letter.module";
import {MemberController} from "./member.controller";
import {MemberService} from "./member.service";
import {MongooseModule} from "@nestjs/mongoose";
import {MemberRepository} from "./repositories/member.repository";
import {Member, MemberSchema} from "../schemas/members/member.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Member.name, schema: MemberSchema}]),
        PlayerModule,
        TrainerModule,
        DirectorModule,
        MedicModule,
        forwardRef(() => LetterModule),
    ],
    controllers: [
        MemberController,
    ],
    exports: [
        PlayerModule,
        TrainerModule,
        DirectorModule,
        MedicModule,
        MemberService,
    ],
    providers: [
        MemberService,
        MemberRepository
    ],
})
export class MemberModule {}
