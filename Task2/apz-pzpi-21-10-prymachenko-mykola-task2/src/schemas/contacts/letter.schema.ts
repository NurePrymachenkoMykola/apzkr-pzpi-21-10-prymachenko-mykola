import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {Roles} from "../members/member.schema";

export type LetterDocument = HydratedDocument<Letter>;

export enum LetterType {
    INVITATION = 'invitation',
    DEFAULT = 'default'
}
export class LetterUser {
    username: string;
    email: string;
    role: Roles
    name: string;
    surname: string;
}
@Schema()
export class Letter {
    _id: mongoose.Types.ObjectId;

    @Prop({required: true})
    sender: LetterUser;

    @Prop({required: true})
    receiver: LetterUser;

    @Prop()
    title: string;

    @Prop({required: true})
    type: LetterType;

    @Prop({type: {
        greeting: mongoose.Schema.Types.String,
        body: mongoose.Schema.Types.String,
        conclusion: mongoose.Schema.Types.String
    }})
    content: {
        greeting: string,
        body: string,
        conclusion: string
    };

    @Prop({default: false})
    isRead: boolean;

    @Prop({type: Date, required: true})
    date: string;
}

export const LetterSchema = SchemaFactory.createForClass(Letter);

