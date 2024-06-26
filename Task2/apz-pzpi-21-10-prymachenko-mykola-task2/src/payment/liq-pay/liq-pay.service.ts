import { Injectable } from '@nestjs/common';
import axios from "axios";
import { createHash, createHmac } from 'node:crypto';
@Injectable()
export class LiqPayService {
    private readonly apiUrl = 'https://www.liqpay.ua/api/request';

    constructor() {}

    async pay(orderId: string, amount: number, customer: string): Promise<any> {

        const liqPayParameters = {
            version: 3,
            public_key: 'sandbox_i40872450031', // Your LiqPay public key
            action: 'pay',
            amount: 10,
            currency: 'UAH', // or 'EUR', 'UAH', etc.
            description: 'Payment for Order #' + orderId,
            // description: 'Payment for Order #' + 'd17aec2b-1b99-4e71-b13d-379e79d54eb4',
            order_id: orderId,
            card: '5168755468803362',
            card_exp_month: '05',
            card_exp_year: '25',
            card_cvv: '123'
            // order_id: 'd17aec2b-1b99-4e71-b13d-379e79d54eb4',
        };
        // console.log(btoa(JSON.stringify(data)));
        const data = btoa(JSON.stringify(liqPayParameters));
        const sign_string = 'sandbox_MsuLPfNTWRk3O5Oho9QQqRwUPKGQ2COvpDKGxGsR' + data + 'sandbox_MsuLPfNTWRk3O5Oho9QQqRwUPKGQ2COvpDKGxGsR';
        const hash = createHash('sha1');
        hash.update(sign_string);
        const signature = hash.digest('base64');
/*        console.log(JSON.stringify(data))
        console.log(btoa('sandbox_MsuLPfNTWRk3O5Oho9QQqRwUPKGQ2COvpDKGxGsR'));
        console.log(btoa(JSON.stringify(data)))*/
        console.log({
            data,
            signature
        })
        try {
            const response = await axios.post(
                'https://www.liqpay.ua/api/request',
                new URLSearchParams({
                    'data': data,
                    'signature': signature,
                }),
                {
                    timeout: 5000
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create LiqPay payment');
        }
    }
}
