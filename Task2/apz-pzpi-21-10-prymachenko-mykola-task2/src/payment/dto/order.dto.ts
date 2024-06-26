import {Club} from "../../schemas/club.schema";
import {Card} from "../../club/dto/subscription.dto";
import {Director} from "../../schemas/members/director.schema";



export class Order {
    orderId: string;
    amount: number;
    years: number;
    director: Director;
    card: Card;
}