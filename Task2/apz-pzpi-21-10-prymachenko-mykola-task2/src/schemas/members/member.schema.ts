import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

export enum Roles {
    PLAYER = 'PLAYER',
    TRAINER = 'TRAINER',
    MEDIC = 'MEDIC',
    DIRECTOR = 'DIRECTOR'
}
@Schema()
export class Member {

    _id: mongoose.Schema.Types.ObjectId;

    @Prop({required: true})
    name: string;

    @Prop({default: 'Snow'})
    surname: string;

    @Prop({unique: true})
    username: string

    @Prop({default: 'qwerty123'})
    password: string;

    @Prop({default: 'mykola.prymachenko@nure.ua'})
    email: string;

    @Prop({default: 'Ukraine'})
    nation: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Letter'}], default: []})
    letters: mongoose.Schema.Types.ObjectId[];

    @Prop({type: Date, default: new Date()})
    birthday: string;

    @Prop({})
    selfDescription: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Club'})
    clubId: string;
}
export const MemberSchema = SchemaFactory.createForClass(Member);

