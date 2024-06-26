import {forwardRef, Module} from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import {DirectorRepository} from "./repositories/director.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Director, DirectorSchema} from "../../schemas/members/director.schema";
import {MailModule} from "../../notifications/mail/mail.module";
import {ClubModule} from "../../club/club.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Director.name, schema: DirectorSchema}]),
        MailModule,
        forwardRef(() => ClubModule),
    ],
    exports: [DirectorService],
    controllers: [DirectorController],
    providers: [DirectorService, DirectorRepository],
})
export class DirectorModule {}
