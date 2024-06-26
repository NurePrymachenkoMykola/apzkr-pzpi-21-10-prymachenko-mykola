import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ClubDocument = HydratedDocument<Club>;

@Schema()
export class Club {
    _id: mongoose.Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    selfDescription: string;

    @Prop({type: Date})
    foundationDate: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Trainer'})
    trainerId: mongoose.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Medic'})
    medicId: mongoose.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Director'})
    directorId: mongoose.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Timetable'})
    timetableId: mongoose.Types.ObjectId;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}]})
    playersId: mongoose.Types.ObjectId[];
}

export const ClubSchema = SchemaFactory.createForClass(Club);

