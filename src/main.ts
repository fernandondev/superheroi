import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Para usar os validadores 
  app.useGlobalPipes(new ValidationPipe);
  await app.listen(3000);
}
bootstrap();
