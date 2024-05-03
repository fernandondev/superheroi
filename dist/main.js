"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = require("express");
const common_1 = require("@nestjs/common");
const log_service_1 = require("./common/log/log.service");
const captura_todas_excecoes_1 = require("./common/exceptions/exceptions-filter/captura.todas.excecoes");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const logger = new common_1.Logger('bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '50mb' }));
    const logService = app.get(log_service_1.LogService);
    app.useGlobalFilters(new captura_todas_excecoes_1.CapturaTodasAsExcecoes(app.get(core_1.HttpAdapterHost), logService));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Documentação com Swagger - Fábrica de Sinapse')
        .setDescription('O Swagger (aka OpenApi) é uma biblioteca muito conhecida no universo backend, estando disponível para diversas linguagens e frameworks. Ela gera um site interno no seu backend que descreve, com muitos detalhes, cada endpoint e estrutura de entidades presentes na sua aplicação.')
        .setVersion('1.0')
        .addTag('autenticacao')
        .addTag('usuario')
        .addTag('superheroi')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map