import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {Game} from "./game.schema";

export type TimetableDocument = HydratedDocument<Timetable>;

@Schema()
export class Timetable {
    _id: mongoose.Types.ObjectId;

    @Prop({})
    season: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}], default: []})
    games: mongoose.Types.ObjectId[];
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);

