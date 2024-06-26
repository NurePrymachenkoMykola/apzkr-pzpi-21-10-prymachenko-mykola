import { Module } from '@nestjs/common';
import {PaymentService} from "./payment.service";
import {PaymentGateway} from "./payment.gateway";
import {StripeService} from "./stripe/stripe.service";
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";

@Module({
    imports: [
        ConfigModule,
        ConfigModule.forRoot({
            envFilePath: './envs/.env.payment',
        }),
        JwtModule.register({
            secret: process.env.PAYMENT_RESPONSE_SECRET,
        }),
    ],
    controllers: [],
    exports: [PaymentService],
    providers: [
        PaymentService,
        {
            provide: 'PaymentPlatform',
            useClass: StripeService
        }
    ],
})
export class PaymentModule {}
