import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {Member} from "./member.schema";

export type MedicDocument = HydratedDocument<Medic>;

@Schema()
export class Medic extends Member {

    @Prop({default: 1})
    experience: number;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cure'}], default: []})
    cures: mongoose.Schema.Types.ObjectId[];
}

export const MedicSchema = SchemaFactory.createForClass(Medic);

