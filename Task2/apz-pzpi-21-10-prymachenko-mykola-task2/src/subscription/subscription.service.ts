import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {RedisClientType} from "redis";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SubscriptionService {
    private SUBSCRIPTION_KEY = 'subscription_price'
    constructor(
        @Inject('REDIS_CONNECTION') private redis: RedisClientType,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async getPrice() {
        const priceString = await this.redis.get(this.SUBSCRIPTION_KEY);
        const price = Number.parseFloat(priceString);

        return price;
    }

    async setPrice(price: number) {
        return await this.redis.set(this.SUBSCRIPTION_KEY, price);

    }

    async verify(subscription: string) {
        try {
            const res = await this.jwtService.verifyAsync(subscription, {
                secret: this.configService.get<string>('PAYMENT_RESPONSE_SECRET')
            });

            return res;
        } catch (e) {
            return new HttpException('Subscription is expired. Please, renew the one!', HttpStatus.CONFLICT);
        }

    }
}
