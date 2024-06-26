import {Inject, Injectable} from '@nestjs/common';
import axios from "axios";
import { createHash, createHmac } from 'node:crypto';
import {PaymentGateway} from "./payment.gateway";
import {Order} from "./dto/order.dto";
import {PaymentResponse} from "./dto/payment-response-dto";
import {JwtService} from "@nestjs/jwt";
import { ConfigService} from "@nestjs/config";
import {SubscriptionTokenDto} from "../club/dto/subscription-token.dto";
import {SubscriptionService} from "../subscription/subscription.service";

@Injectable()
export class PaymentService {
    constructor(
        @Inject('PaymentPlatform') private paymentPlatform: PaymentGateway,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    public async processSubscriptionPayment(order: Order, currentSubscription: string) {
        const paymentResponse = await this.processPayment(order);
        if (paymentResponse.successfully) {
            let currentPayload: SubscriptionTokenDto;
            let exp_date = new Date();

            if (currentSubscription) {
                currentPayload = await this.jwtService.verifyAsync(
                    currentSubscription,
                    {secret: this.configService.get<string>('PAYMENT_RESPONSE_SECRET')}
                );

                exp_date = new Date(currentPayload.exp_date);
            }

            exp_date.setFullYear(exp_date.getFullYear() + paymentResponse.years);

            const subscriptionPayload: SubscriptionTokenDto = {
                paymentId: paymentResponse.id,
                exp_date: exp_date.toISOString(),
            }
            const newSubscription = await this.jwtService.signAsync(
                subscriptionPayload,
            );

            return newSubscription;
        }
    }
    public async processPayment(order: Order): Promise<PaymentResponse> {
        return this.paymentPlatform.processPayment(order);
    }
}
