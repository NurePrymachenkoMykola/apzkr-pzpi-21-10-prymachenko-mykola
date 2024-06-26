import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {useContainer} from "class-validator";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ['http://localhost:3000'],
        credentials: true
    });
    app.use(cookieParser());
    useContainer(app.select(AppModule), {fallbackOnErrors: true});

    await app.listen(3333);
}
bootstrap();
