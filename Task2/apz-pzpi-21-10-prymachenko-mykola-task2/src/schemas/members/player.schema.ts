import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Member} from "./member.schema";

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player extends Member {

    @Prop({default: 'CB'})
    position: string;

    @Prop()
    number: number
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

