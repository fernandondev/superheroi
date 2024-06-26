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
exports.AutenticacaoLoginRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AutenticacaoLoginRequestDto {
}
exports.AutenticacaoLoginRequestDto = AutenticacaoLoginRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do usuário',
        required: false,
        example: 'email@email.com'
    }),
    (0, class_validator_1.IsString)({ message: 'O email deve ser uma string.' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AutenticacaoLoginRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cpf do usuário',
        required: false,
        example: '111.111.111-11'
    }),
    (0, class_validator_1.IsString)({ message: 'O cpf deve ser uma string.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AutenticacaoLoginRequestDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Senha do usuário',
        required: true,
        example: 'senhadousuario123456'
    }),
    (0, class_validator_1.IsDefined)({ message: 'Senha é obrigatória' }),
    (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }),
    __metadata("design:type", String)
], AutenticacaoLoginRequestDto.prototype, "senha", void 0);
//# sourceMappingURL=autenticacao.login.request.dto.js.map