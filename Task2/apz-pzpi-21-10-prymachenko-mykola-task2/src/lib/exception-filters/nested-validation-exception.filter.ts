import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class NestedValidationExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse();
        const messages: string[] = exceptionResponse['message'];
        let dotInd;
        if (messages) {
            for (let i = 0; i < messages.length; i++) {
                const message = messages[i];
                if (message) {
                    dotInd = message.lastIndexOf('.');
                }
                if (dotInd !== -1) {
                    console.log(exceptionResponse['message'])
                    exceptionResponse['message'][i] = message.slice(dotInd + 1);
                }
            }
        }

        response
            .status(status)
            .json(exceptionResponse);
    }
}