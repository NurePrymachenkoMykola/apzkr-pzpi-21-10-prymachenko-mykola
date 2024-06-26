import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Member} from "./member.schema";

export type DirectorDocument = HydratedDocument<Director>;

@Schema()
export class Director extends Member {
    @Prop()
    subscription: string;
}

export const DirectorSchema = SchemaFactory.createForClass(Director);

