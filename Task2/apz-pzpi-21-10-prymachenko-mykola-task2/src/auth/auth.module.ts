import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {PlayerModule} from "../members/player/player.module";
import {TrainerModule} from "../members/trainer/trainer.module";
import {MedicModule} from "../members/medic/medic.module";
import {DirectorModule} from "../members/director/director.module";
import {AuthGuard} from "./guards/auth.guard";
import {AdminModule} from "../admin/admin.module";
import {RolesGuard} from "./guards/roles.guard";

@Module({
    imports: [
        ConfigModule,
        ConfigModule.forRoot({
            envFilePath: './envs/.env.auth',
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '1000000m'}
        }),
        PlayerModule,
        TrainerModule,
        MedicModule,
        DirectorModule,
        AdminModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard
        },
        {
            provide: 'APP_GUARD',
            useClass: RolesGuard
        }
    ],
})
export class AuthModule {}
