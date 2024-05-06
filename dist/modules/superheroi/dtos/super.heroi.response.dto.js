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
exports.SuperHeroiResponseDto = exports.ElementoSuperHeroiDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let ElementoSuperHeroiDto = class ElementoSuperHeroiDto {
};
exports.ElementoSuperHeroiDto = ElementoSuperHeroiDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ElementoSuperHeroiDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", BigInt)
], ElementoSuperHeroiDto.prototype, "id", void 0);
exports.ElementoSuperHeroiDto = ElementoSuperHeroiDto = __decorate([
    (0, swagger_1.ApiExtraModels)()
], ElementoSuperHeroiDto);
class SuperHeroiResponseDto {
}
exports.SuperHeroiResponseDto = SuperHeroiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", BigInt)
], SuperHeroiResponseDto.prototype, "idSuperHeroi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SuperHeroiResponseDto.prototype, "nomeSuperHeroi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SuperHeroiResponseDto.prototype, "nomeCompleto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoSuperHeroiDto),
    __metadata("design:type", ElementoSuperHeroiDto)
], SuperHeroiResponseDto.prototype, "genero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoSuperHeroiDto),
    __metadata("design:type", ElementoSuperHeroiDto)
], SuperHeroiResponseDto.prototype, "corDoOlho", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoSuperHeroiDto),
    __metadata("design:type", ElementoSuperHeroiDto)
], SuperHeroiResponseDto.prototype, "corDoCabelo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoSuperHeroiDto),
    __metadata("design:type", ElementoSuperHeroiDto)
], SuperHeroiResponseDto.prototype, "corDaPele", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoSuperHeroiDto),
    __metadata("design:type", ElementoSuperHeroiDto)
], SuperHeroiResponseDto.prototype, "raca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoSuperHeroiDto),
    __metadata("design:type", ElementoSuperHeroiDto)
], SuperHeroiResponseDto.prototype, "editora", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementoSuperHeroiDto),
    __metadata("design:type", ElementoSuperHeroiDto)
], SuperHeroiResponseDto.prototype, "alinhamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SuperHeroiResponseDto.prototype, "altura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SuperHeroiResponseDto.prototype, "peso", void 0);
//# sourceMappingURL=super.heroi.response.dto.js.map