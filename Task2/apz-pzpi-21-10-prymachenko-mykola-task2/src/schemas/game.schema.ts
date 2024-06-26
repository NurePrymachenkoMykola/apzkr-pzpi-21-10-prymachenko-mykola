import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
    _id: mongoose.Types.ObjectId;

    @Prop({})
    homeTeam: string;

    @Prop({})
    guestTeam: string;

    @Prop({type: mongoose.Schema.Types.Date})
    date: string;

    @Prop({default: false})
    isPlayed: boolean;

    @Prop({default: false})
    isTraining: boolean;

    @Prop({
        type: {
            homeTeam: mongoose.Schema.Types.Number,
            guestTeam: mongoose.Schema.Types.Number
        }
    })
    score: {
        homeTeam: number,
        guestTeam: number
    }
}

export const GameSchema = SchemaFactory.createForClass(Game);