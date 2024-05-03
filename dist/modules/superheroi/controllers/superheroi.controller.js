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
exports.SuperheroiController = void 0;
const common_1 = require("@nestjs/common");
const autenticacao_guard_1 = require("../../../common/guards/autenticacao/autenticacao.guard");
const superheroi_service_1 = require("../services/superheroi.service");
const cadastro_super_heroi_request_dto_1 = require("../dtos/cadastro.super.heroi.request.dto");
const atualizar_super_heroi_request_dto_1 = require("../dtos/atualizar.super.heroi.request.dto");
const delete_super_heroi_parameter_1 = require("../dtos/delete.super.heroi.parameter");
const swagger_1 = require("@nestjs/swagger");
let SuperheroiController = class SuperheroiController {
    constructor(superHeroiService) {
        this.superHeroiService = superHeroiService;
    }
    async pegarParametrosCadastro() {
        return await this.superHeroiService.pegarParametrosCadastro();
    }
    async listarTodos() {
        return await this.superHeroiService.listarTodosSuperHerois();
    }
    async cadastrarSuperHeroi(cadastroSuperHeroiRequestDto) {
        return await this.superHeroiService.cadastrarSuperHeroi(cadastroSuperHeroiRequestDto);
    }
    async atualizarSuperHeroi(params, superHeroi) {
        return await this.superHeroiService.atualizarSuperHeroi(params.id, superHeroi);
    }
    async deletarSuperHeroi(params) {
        return await this.superHeroiService.deletarSuperHeroi(params.id);
    }
};
exports.SuperheroiController = SuperheroiController;
__decorate([
    (0, common_1.Get)('parametros-para-cadastro-e-atualizacao'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "pegarParametrosCadastro", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "listarTodos", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cadastro_super_heroi_request_dto_1.CadastroSuperHeroiRequestDto]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "cadastrarSuperHeroi", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [atualizar_super_heroi_request_dto_1.AtualizarSuperHeroiParameters, atualizar_super_heroi_request_dto_1.AtualizarSuperHeroiRequestDto]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "atualizarSuperHeroi", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_super_heroi_parameter_1.DeleteSuperHeroiParameter]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "deletarSuperHeroi", null);
exports.SuperheroiController = SuperheroiController = __decorate([
    (0, swagger_1.ApiTags)('superheroi'),
    (0, common_1.Controller)('superheroi'),
    (0, common_1.UseGuards)(autenticacao_guard_1.AutenticacaoGuard),
    __metadata("design:paramtypes", [superheroi_service_1.SuperheroiService])
], SuperheroiController);
//# sourceMappingURL=superheroi.controller.js.map