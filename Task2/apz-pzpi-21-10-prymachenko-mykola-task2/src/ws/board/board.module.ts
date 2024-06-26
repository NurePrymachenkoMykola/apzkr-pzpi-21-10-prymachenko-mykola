import { Module } from '@nestjs/common';
import {BoardGateway} from "./board.gateway";

@Module({
    imports: [
    ],
    exports: [BoardGateway],
    providers: [BoardGateway],
})
export class BoardModule {}