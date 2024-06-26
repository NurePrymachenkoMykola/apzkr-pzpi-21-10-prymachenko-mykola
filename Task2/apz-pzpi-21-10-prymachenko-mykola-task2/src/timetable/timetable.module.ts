import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import {TimetableRepository} from "./repositories/timetable.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Timetable, TimetableSchema} from "../schemas/timetable.schema";
import {GameModule} from "../game/game.module";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Timetable.name, schema: TimetableSchema}]),
      GameModule
  ],
  exports: [TimetableService],
  controllers: [],
  providers: [TimetableService, TimetableRepository],
})
export class TimetableModule {}
