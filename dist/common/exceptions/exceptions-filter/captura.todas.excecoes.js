"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapturaTodasAsExcecoes = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const log_service_1 = require("../../log/log.service");
const log_enum_1 = require("../../log/models/enums/log.enum");
let CapturaTodasAsExcecoes = class CapturaTodasAsExcecoes {
    constructor(httpAdapterHost, logService) {
        this.httpAdapterHost = httpAdapterHost;
        this.logService = logService;
        this.logger = new common_1.Logger();
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        this.logService.gravarLog(exception['message'], log_enum_1.LogEnum.ERROR);
        const httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        httpAdapter.reply(ctx.getResponse(), exception['response'], httpStatus);
    }
};
exports.CapturaTodasAsExcecoes = CapturaTodasAsExcecoes;
exports.CapturaTodasAsExcecoes = CapturaTodasAsExcecoes = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost, log_service_1.LogService])
], CapturaTodasAsExcecoes);
//# sourceMappingURL=captura.todas.excecoes.js.map