import {AxiosResponse} from "axios";
import {Order} from "./dto/order.dto";
import {PaymentResponse} from "./dto/payment-response-dto";

export abstract class PaymentGateway {
    abstract processPayment(order: Order): Promise<PaymentResponse>;
}

