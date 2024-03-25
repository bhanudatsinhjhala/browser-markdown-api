import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Response } from 'express';
import { Logger } from 'winston';
import { ResponseHandler } from '../utils/response-handler';

/**
 * Global Exception Filter
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  /**
   * Description - Global Exception Filter Dependencies
   * @param logger
   */
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  /**
   * Description - Catch Exception And Return Common Error Response
   * @param exception
   * @param host
   * @returns
   */
  catch(exception: Error, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error(
      `Error: method: ${request.method} - url :${request.url} - error : ${exception.stack}`,
    );
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      return response
        .status(statusCode)
        .json(
          ResponseHandler.error(exception.message, statusCode, exception.name),
        );
    }

    return response
      .status(HttpStatus.BAD_REQUEST)
      .json(
        ResponseHandler.error(
          exception.message,
          HttpStatus.BAD_REQUEST,
          exception.name,
        ),
      );
  }
}
