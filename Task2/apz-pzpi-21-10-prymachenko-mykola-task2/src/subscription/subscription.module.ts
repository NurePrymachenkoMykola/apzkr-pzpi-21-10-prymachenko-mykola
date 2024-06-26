import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import redisConnection from "../lib/redis.connection";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule,
        ConfigModule.forRoot({
            envFilePath: './envs/.env.payment',
        }),
    ],
    controllers: [],
    exports: [
        SubscriptionService
    ],
    providers: [
        SubscriptionService,
        {
            provide: 'REDIS_CONNECTION',
            useFactory: async () => {
                return await redisConnection();
            }
        }
    ],
})
export class SubscriptionModule {}
