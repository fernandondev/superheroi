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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../services/usuario.service");
const criar_usuario_request_dto_1 = require("../dtos/criar.usuario.request.dto");
const autenticacao_guard_1 = require("../../../common/guards/autenticacao/autenticacao.guard");
const usuario_dto_1 = require("../dtos/usuario.dto");
const atualizar_usuario_request_dto_1 = require("../dtos/atualizar.usuario.request.dto");
const swagger_1 = require("@nestjs/swagger");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async criar(usuario) {
        return await this.usuarioService.criar(usuario);
    }
    async pesquisarPorId(id) {
        return await this.usuarioService.pesquisarPorId(id);
    }
    async atualizar(params, usuario) {
        return await this.usuarioService.atualizar(params.id, usuario);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [criar_usuario_request_dto_1.CriarUsuarioRequestDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(autenticacao_guard_1.AutenticacaoGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "pesquisarPorId", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(autenticacao_guard_1.AutenticacaoGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_dto_1.UsuarioPutParameters, atualizar_usuario_request_dto_1.AtualizarUsuarioRequestDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizar", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, swagger_1.ApiTags)('usuario'),
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map