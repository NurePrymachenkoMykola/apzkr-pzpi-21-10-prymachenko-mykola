import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import {MemberModule} from "../members/member.module";
import {ClubModule} from "../club/club.module";
import {LetterModule} from "../notifications/letter/letter.module";
import {MemberService} from "../members/member.service";

@Module({
    imports: [
        MemberModule,
        ClubModule,
        LetterModule
    ],
    controllers: [TransferController],
    providers: [TransferService],
})
export class TransferModule {}
