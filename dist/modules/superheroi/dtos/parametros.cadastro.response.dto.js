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
exports.ParametrosCadastroResponseDto = exports.ElementoParametrosCadastroResponsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let ElementoParametrosCadastroResponsDto = class ElementoParametrosCadastroResponsDto {
};
exports.ElementoParametrosCadastroResponsDto = ElementoParametrosCadastroResponsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ElementoParametrosCadastroResponsDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", BigInt)
], ElementoParametrosCadastroResponsDto.prototype, "id", void 0);
exports.ElementoParametrosCadastroResponsDto = ElementoParametrosCadastroResponsDto = __decorate([
    (0, swagger_1.ApiExtraModels)()
], ElementoParametrosCadastroResponsDto);
class ParametrosCadastroResponseDto {
    constructor() {
        this.genero = [];
        this.corDoOlho = [];
        this.corDoCabelo = [];
        this.corDaPele = [];
        this.raca = [];
        this.editora = [];
        this.alinhamento = [];
    }
}
exports.ParametrosCadastroResponseDto = ParametrosCadastroResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ParametrosCadastroResponseDto.prototype, "nomeSuperHeroi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ParametrosCadastroResponseDto.prototype, "nomeCompleto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoParametrosCadastroResponsDto),
    __metadata("design:type", Array)
], ParametrosCadastroResponseDto.prototype, "genero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoParametrosCadastroResponsDto),
    __metadata("design:type", Array)
], ParametrosCadastroResponseDto.prototype, "corDoOlho", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoParametrosCadastroResponsDto),
    __metadata("design:type", Array)
], ParametrosCadastroResponseDto.prototype, "corDoCabelo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoParametrosCadastroResponsDto),
    __metadata("design:type", Array)
], ParametrosCadastroResponseDto.prototype, "corDaPele", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoParametrosCadastroResponsDto),
    __metadata("design:type", Array)
], ParametrosCadastroResponseDto.prototype, "raca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoParametrosCadastroResponsDto),
    __metadata("design:type", Array)
], ParametrosCadastroResponseDto.prototype, "editora", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoParametrosCadastroResponsDto),
    __metadata("design:type", Array)
], ParametrosCadastroResponseDto.prototype, "alinhamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ParametrosCadastroResponseDto.prototype, "altura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ParametrosCadastroResponseDto.prototype, "peso", void 0);
//# sourceMappingURL=parametros.cadastro.response.dto.js.map