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
exports.AtualizarSuperHeroiParameters = exports.AtualizarSuperHeroiRequestDto = void 0;
const class_validator_1 = require("class-validator");
class AtualizarSuperHeroiRequestDto {
}
exports.AtualizarSuperHeroiRequestDto = AtualizarSuperHeroiRequestDto;
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo nomeSuperHeroi é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O campo nomeSuperHeroi deve ser uma string.' }),
    (0, class_validator_1.MaxLength)(200, { message: 'O campo nomeSuperHeroi deve conter menos de 200 dígitos.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O campo nomeSuperHeroi conter mais de 3 dígitos.' }),
    __metadata("design:type", String)
], AtualizarSuperHeroiRequestDto.prototype, "nomeSuperHeroi", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo nomeCompleto é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O campo nomeCompleto deve ser uma string.' }),
    (0, class_validator_1.MaxLength)(200, { message: 'O campo nomeCompleto deve conter menos de 200 dígitos.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O campo nomeCompleto deve conter mais de 3 dígitos.' }),
    __metadata("design:type", String)
], AtualizarSuperHeroiRequestDto.prototype, "nomeCompleto", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], AtualizarSuperHeroiRequestDto.prototype, "generoId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], AtualizarSuperHeroiRequestDto.prototype, "corDoOlhoId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], AtualizarSuperHeroiRequestDto.prototype, "corDoCabeloId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], AtualizarSuperHeroiRequestDto.prototype, "corDaPeleId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], AtualizarSuperHeroiRequestDto.prototype, "racaId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], AtualizarSuperHeroiRequestDto.prototype, "editoraId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo generoId é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], AtualizarSuperHeroiRequestDto.prototype, "alinhamentoId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo altura é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AtualizarSuperHeroiRequestDto.prototype, "altura", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O campo peso é obrigatório' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AtualizarSuperHeroiRequestDto.prototype, "peso", void 0);
class AtualizarSuperHeroiParameters {
}
exports.AtualizarSuperHeroiParameters = AtualizarSuperHeroiParameters;
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'O parãmetro id é obrigatorio' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], AtualizarSuperHeroiParameters.prototype, "id", void 0);
//# sourceMappingURL=atualizar.super.heroi.request.dto.js.map