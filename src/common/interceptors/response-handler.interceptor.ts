import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { CommonResponse } from '../common.type';

/**
 * Description - Response Interceptor provider
 */
@Injectable()
export class ResponseInterceptorsService implements NestInterceptor {
  /**
   * Description - Change Status of Response
   * @param context
   * @param next
   * @returns Common Response
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((sentResponse: CommonResponse<any>) => {
        if (sentResponse?.status) {
          response.status(sentResponse.statusCode);
        }
        return sentResponse;
      }),
    );
  }
}
