import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import type { NestApplicationOptions } from '@nestjs/common';

async function bootstrap() {
  const options: NestApplicationOptions = {
    cors: true,
  }
  const app = await NestFactory.create(AppModule, options);
  const configService = app.get(ConfigService);
  await app.listen(3000);
}
bootstrap();
