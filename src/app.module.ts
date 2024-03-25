import { BadRequestException, Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { IEnvConfig } from './common/common.type';
import { winstonOptions } from './common/config/logger.config';
import { errorMessages } from './common/config/messages.config';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { ResponseInterceptorsService } from './common/interceptors/response-handler.interceptor';
import { Markdown, MarkdownSchema } from './common/schema/markdown.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnvConfig>) => ({
        uri: configService.get('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Markdown.name, schema: MarkdownSchema }]),
    WinstonModule.forRootAsync({ useFactory: () => winstonOptions() }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptorsService,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        exceptionFactory: (validationErrors: ValidationError[] = []): BadRequestException | void => {
          if (validationErrors.length && validationErrors[0]?.constraints) {
            const errorKey = Object.keys(validationErrors[0]?.constraints)[0];
            return new BadRequestException(
              validationErrors[0].constraints[`${errorKey}`] || errorMessages.UNEXPECTED_ERROR,
            );
          }
        },
      }),
    },
    AppService,
  ],
})
export class AppModule {}
