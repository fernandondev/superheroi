import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { Logger } from '@nestjs/common';
import { LogService } from './common/log/log.service';
import { CapturaTodasAsExcecoes } from './common/exceptions/exceptions-filter/captura.todas.excecoes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  const logService = app.get<LogService>(LogService);
  app.useGlobalFilters(new CapturaTodasAsExcecoes(app.get(HttpAdapterHost), logService));
  
  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Fábrica de Sinapse')
    .setDescription(
      'O Swagger (aka OpenApi) é uma biblioteca muito conhecida no universo backend, estando disponível para diversas linguagens e frameworks. Ela gera um site interno no seu backend que descreve, com muitos detalhes, cada endpoint e estrutura de entidades presentes na sua aplicação.',
    )
    .setVersion('1.0')
    .addTag('autenticacao')
    .addTag('usuario')
    .addTag('superheroi')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
