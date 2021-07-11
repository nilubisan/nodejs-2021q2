import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import AppModule from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = process.env.USE_FASTIFY === "false" ? await NestFactory.create(AppModule): await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );;
  await app.listen(4000);
}
bootstrap();