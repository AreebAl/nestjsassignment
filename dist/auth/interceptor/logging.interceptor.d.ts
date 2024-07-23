import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Logger } from 'winston';
import { Observable } from 'rxjs';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: Logger);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
