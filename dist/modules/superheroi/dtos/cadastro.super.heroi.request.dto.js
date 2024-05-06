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
exports.CadastroSuperHeroiRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CadastroSuperHeroiRequestDto {
}
exports.CadastroSuperHeroiRequestDto = CadastroSuperHeroiRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Chapolin',
        description: `O nome é de livre escolha.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo nomeSuperHeroi é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O campo nomeSuperHeroi deve ser uma string.' }),
    (0, class_validator_1.MaxLength)(200, { message: 'O campo nomeSuperHeroi deve conter menos de 200 dígitos.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O campo nomeSuperHeroi conter mais de 3 dígitos.' }),
    __metadata("design:type", String)
], CadastroSuperHeroiRequestDto.prototype, "nomeSuperHeroi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Chapolin Colorado',
        description: `O nome completo é de livre escolha.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo nomeCompleto é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O campo nomeCompleto deve ser uma string.' }),
    (0, class_validator_1.MaxLength)(200, { message: 'O campo nomeCompleto deve conter menos de 200 dígitos.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O campo nomeCompleto deve conter mais de 3 dígitos.' }),
    __metadata("design:type", String)
], CadastroSuperHeroiRequestDto.prototype, "nomeCompleto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], CadastroSuperHeroiRequestDto.prototype, "generoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], CadastroSuperHeroiRequestDto.prototype, "corDoOlhoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], CadastroSuperHeroiRequestDto.prototype, "corDoCabeloId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], CadastroSuperHeroiRequestDto.prototype, "corDaPeleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], CadastroSuperHeroiRequestDto.prototype, "racaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], CadastroSuperHeroiRequestDto.prototype, "editoraId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], CadastroSuperHeroiRequestDto.prototype, "alinhamentoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 152,
        description: `A altura é em cm'.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo altura é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CadastroSuperHeroiRequestDto.prototype, "altura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 68,
        description: `O peso é em KG'.`,
        required: true
    }),
    (0, class_validator_1.IsDefined)({ message: 'O campo peso é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CadastroSuperHeroiRequestDto.prototype, "peso", void 0);
//# sourceMappingURL=cadastro.super.heroi.request.dto.js.map