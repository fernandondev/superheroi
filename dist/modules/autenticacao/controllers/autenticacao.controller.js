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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacaoController = void 0;
const common_1 = require("@nestjs/common");
const autenticacao_service_1 = require("../services/autenticacao.service");
const autenticacao_response_dto_1 = require("../dtos/autenticacao.response.dto");
const autenticacao_login_request_dto_1 = require("../dtos/autenticacao.login.request.dto");
const autenticacao_renova_token_request_dto_1 = require("../dtos/autenticacao.renova.token.request.dto");
const autenticacao_guard_1 = require("../../../common/guards/autenticacao/autenticacao.guard");
const swagger_1 = require("@nestjs/swagger");
let AutenticacaoController = class AutenticacaoController {
    constructor(autenticacaoService) {
        this.autenticacaoService = autenticacaoService;
    }
    async login(autenticacaoLoginRequestDto) {
        return await this.autenticacaoService.login(autenticacaoLoginRequestDto);
    }
    async logout(accessToken) {
        return await this.autenticacaoService.logout(accessToken);
    }
    async inativarUsuario(accessToken) {
        return await this.autenticacaoService.inativarUsuario(accessToken);
    }
    async reautenticar(autenticacaoRenovaTokenRequestDto) {
        return await this.autenticacaoService.reautenticar(autenticacaoRenovaTokenRequestDto);
    }
};
exports.AutenticacaoController = AutenticacaoController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Caso o usuário exista e for logado.', type: autenticacao_response_dto_1.AutenticacaoResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [autenticacao_login_request_dto_1.AutenticacaoLoginRequestDto]),
    __metadata("design:returntype", Promise)
], AutenticacaoController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('logout'),
    (0, common_1.UseGuards)(autenticacao_guard_1.AutenticacaoGuard),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AutenticacaoController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('inativa-usuario'),
    (0, common_1.UseGuards)(autenticacao_guard_1.AutenticacaoGuard),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AutenticacaoController.prototype, "inativarUsuario", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('jwt/reautentica'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Caso o usuário exista e for reautenticado.', type: autenticacao_response_dto_1.AutenticacaoResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [autenticacao_renova_token_request_dto_1.AutenticacaoRenovaTokenRequestDto]),
    __metadata("design:returntype", Promise)
], AutenticacaoController.prototype, "reautenticar", null);
exports.AutenticacaoController = AutenticacaoController = __decorate([
    (0, swagger_1.ApiTags)('autenticacao'),
    (0, common_1.Controller)('autenticacao'),
    __metadata("design:paramtypes", [autenticacao_service_1.AutenticacaoService])
], AutenticacaoController);
//# sourceMappingURL=autenticacao.controller.js.map