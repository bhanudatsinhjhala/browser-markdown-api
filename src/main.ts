import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  if (!process.env.PORT) throw new Error('Port is not defined');
  await app.listen(process.env.PORT);
  console.info('🚀 Server is running on port ~', process.env.PORT);
}
bootstrap();
