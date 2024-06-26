import { Injectable } from '@nestjs/common';
import {PaymentGateway} from "../payment.gateway";
import {Stripe} from 'stripe';
import {Club} from "../../schemas/club.schema";
import {Order} from "../dto/order.dto";
import {PaymentResponse} from "../dto/payment-response-dto";
@Injectable()
export class StripeService implements PaymentGateway {
    constructor() {}

    async processPayment(order: Order): Promise<PaymentResponse> {
        try {
            const stripe = new Stripe('sk_test_51Nt9KvJ03ZLe07gZNhQewsXBBfdBRU5ScAsObciphDRjIrpUL20TgYIMwfmgaQi58Isk8i0qRSjHpK671Wgruuw400wGe7Xy9O', {
                apiVersion: '2023-08-16'
            });
            let customer: Stripe.Customer;
            const alreadyExist = (await stripe.customers.list()).data.find(customerItem => {
                if (customerItem.metadata.directorId === order.director._id.toString()) {
                    customer = customerItem;
                }
            });
            if (!alreadyExist) {
                /*const cardPaymentMethod = await stripe.paymentMethods.create({
                    type: 'card',

                    card: {
                        number: order.card.number,
                        exp_month: order.card.exp_month,
                        exp_year: order.card.exp_year,
                        cvc: order.card.cvc
                    },
                })*/
                customer = await stripe.customers.create({
                    metadata: {
                        directorId: order.director._id.toString()
                    },
                    name: order.director.username,
                })
            }

          /*let cardToken: Stripe.Token;
            if (!customer.default_source) {
                cardToken = await stripe.tokens.create({
                    customer: customer.id,
                    card: {
                        number: order.card.number,
                        exp_month: order.card.exp_month.toString(),
                        exp_year: order.card.exp_year.toString(),
                        cvc: order.card.cvc,
                    },
                }, {});
            }*/
             const response = await stripe.paymentIntents.create({
                 amount: order.amount * 100,
                 currency: 'USD',
                 customer: customer.id,
                 confirm: true,
                 return_url: 'https://google.com',
                 payment_method: 'pm_card_visa',
                 setup_future_usage: 'off_session',
                 metadata: {
                     years: order.years
                 }
             });
             console.log(response);
             const paymentResponse: PaymentResponse = {
                 id: response.id,
                 successfully: response.status === 'succeeded',
                 years: order.years,
             }
             return paymentResponse;
        } catch (e) {
            console.log({
                message: e.message,
            });
            throw new Error('Failed to create Stripe payment');
        }
    }
}
