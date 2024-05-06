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
const parametros_cadastro_response_dto_1 = require("../dtos/parametros.cadastro.response.dto");
const atualizar_super_heroi_request_dto_1 = require("../dtos/atualizar.super.heroi.request.dto");
const delete_super_heroi_parameter_1 = require("../dtos/delete.super.heroi.parameter");
const swagger_1 = require("@nestjs/swagger");
const paginacao_dto_1 = require("../dtos/paginacao.dto");
const filtro_confronto_editoras_dto_1 = require("../dtos/filtro.confronto.editoras.dto");
const confronto_duas_editoras_parameters_dto_1 = require("../dtos/confronto.duas.editoras.parameters.dto");
let SuperheroiController = class SuperheroiController {
    constructor(superHeroiService) {
        this.superHeroiService = superHeroiService;
    }
    async pegarParametrosCadastro() {
        return await this.superHeroiService.pegarParametrosCadastro();
    }
    async listarTodosDetalhado(paginacaoDto) {
        return await this.superHeroiService.listarTodosSuperHeroisDetalhado(paginacaoDto);
    }
    async confrontosTodosHerois(paginacaoDto) {
        return await this.superHeroiService.confrontosSuperHerois(paginacaoDto);
    }
    async confrontoTodasEditoras(filtroConfrontoEditorasDto) {
        return await this.superHeroiService.confrontoTodasEditoras(filtroConfrontoEditorasDto);
    }
    async confrontoDuasEditoras(confrontoDuasEditorasParametersDto) {
        return await this.superHeroiService.confrontoDuasEditoras(confrontoDuasEditorasParametersDto);
    }
    async cadastrarSuperHeroi(cadastroSuperHeroiRequestDto) {
        return await this.superHeroiService.cadastrarSuperHeroi(cadastroSuperHeroiRequestDto);
    }
    async atualizarSuperHeroi(params, superHeroi) {
        return await this.superHeroiService.atualizarSuperHeroi(BigInt(params.id), superHeroi);
    }
    async deletarSuperHeroi(params) {
        return await this.superHeroiService.deletarSuperHeroi(BigInt(params.id));
    }
};
exports.SuperheroiController = SuperheroiController;
__decorate([
    (0, common_1.Get)('parametros-para-cadastro-e-atualizacao'),
    (0, swagger_1.ApiOkResponse)({ description: 'Retorna todos os parametros (ids) que poderão ser utilizados nos endpoints de atualização ou cadastro', type: parametros_cadastro_response_dto_1.ParametrosCadastroResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "pegarParametrosCadastro", null);
__decorate([
    (0, common_1.Get)('detalhado'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retorna todos os heróis cadastrados no sistema, com seu detalhamento (poderes e atributos).' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginacao_dto_1.FiltroEPaginacaoDto]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "listarTodosDetalhado", null);
__decorate([
    (0, common_1.Get)('confrontos-todos-herois'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })),
    (0, swagger_1.ApiOkResponse)({ description: 'Retorna todos os confrontos entre todos os heróis do sistema, de forma paginada.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginacao_dto_1.FiltroEPaginacaoDto]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "confrontosTodosHerois", null);
__decorate([
    (0, common_1.Get)('confronto-todas-editoras'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })),
    (0, swagger_1.ApiOkResponse)({ description: 'Retorna o resultado de todos os confrontos entre as editoras cadastradas no sistema.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtro_confronto_editoras_dto_1.FiltroConfrontoEditorasRequestDto]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "confrontoTodasEditoras", null);
__decorate([
    (0, common_1.Get)('confronto-duas-editoras'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })),
    (0, swagger_1.ApiOkResponse)({ description: 'Retorna o resultado entre o confronto entre duas editoras especificadas.' }),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confronto_duas_editoras_parameters_dto_1.ConfrontoDuasEditorasParametersDto]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "confrontoDuasEditoras", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, swagger_1.ApiConflictResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cadastro_super_heroi_request_dto_1.CadastroSuperHeroiRequestDto]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "cadastrarSuperHeroi", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiConflictResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [atualizar_super_heroi_request_dto_1.AtualizarSuperHeroiParameters, atualizar_super_heroi_request_dto_1.AtualizarSuperHeroiRequestDto]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "atualizarSuperHeroi", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_super_heroi_parameter_1.DeleteSuperHeroiParameter]),
    __metadata("design:returntype", Promise)
], SuperheroiController.prototype, "deletarSuperHeroi", null);
exports.SuperheroiController = SuperheroiController = __decorate([
    (0, swagger_1.ApiTags)('superheroi'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('superheroi'),
    (0, common_1.UseGuards)(autenticacao_guard_1.AutenticacaoGuard),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    __metadata("design:paramtypes", [superheroi_service_1.SuperheroiService])
], SuperheroiController);
//# sourceMappingURL=superheroi.controller.js.map