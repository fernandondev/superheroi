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
exports.CriarUsuarioRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CriarUsuarioRequestDto {
}
exports.CriarUsuarioRequestDto = CriarUsuarioRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cpf do usuário',
        required: true,
        example: '111.111.111-11'
    }),
    (0, class_validator_1.IsDefined)({ message: 'cpf é obrigatório' }),
    (0, class_validator_1.Matches)(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { message: 'O cpf enviado não é válido.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriarUsuarioRequestDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'Fernando'
    }),
    (0, class_validator_1.IsDefined)({ message: 'Nome é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, class_validator_1.MaxLength)(200, { message: 'O nome deve conter menos de 200 dígitos.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O nome deve conter mais de 3 dígitos.' }),
    __metadata("design:type", String)
], CriarUsuarioRequestDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'fernando@fernando.com'
    }),
    (0, class_validator_1.IsDefined)({ message: 'Email é obrigatório' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)({ message: 'O email deve ser uma string.' }),
    (0, class_validator_1.MaxLength)(100, { message: 'O email deve conter menos de 100 dígitos.' }),
    (0, class_validator_1.MinLength)(10, { message: 'O email deve conter mais de 10 dígitos.' }),
    __metadata("design:type", String)
], CriarUsuarioRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'base64'
    }),
    (0, class_validator_1.Matches)(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, { message: 'A foto deve estar no formato base64' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CriarUsuarioRequestDto.prototype, "fotoBase64", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'senhafernando123456'
    }),
    (0, class_validator_1.IsDefined)({ message: 'Senha é obrigatória' }),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Senha deve conter pelo menos uma letra maiúscula e um caracter especial (?, @, $, dentre outros)!' }),
    (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }),
    (0, class_validator_1.MaxLength)(100, { message: 'A senha deve conter menos de 100 dígitos.' }),
    (0, class_validator_1.MinLength)(8, { message: 'A senha deve conter mais de 8 dígitos.' }),
    __metadata("design:type", String)
], CriarUsuarioRequestDto.prototype, "senha", void 0);
//# sourceMappingURL=criar.usuario.request.dto.js.map