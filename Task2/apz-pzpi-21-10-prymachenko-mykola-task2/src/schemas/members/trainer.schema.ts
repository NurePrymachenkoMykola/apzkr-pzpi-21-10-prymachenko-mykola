import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Member} from "./member.schema";

export type TrainerDocument = HydratedDocument<Trainer>;

@Schema()
export class Trainer extends Member {

    @Prop({default: 1})
    experience: number;

}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);

