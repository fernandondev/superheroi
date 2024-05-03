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
exports.HeroiAtributoEntity = void 0;
const typeorm_1 = require("typeorm");
let HeroiAtributoEntity = class HeroiAtributoEntity {
};
exports.HeroiAtributoEntity = HeroiAtributoEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int8', name: 'hero_id' }),
    __metadata("design:type", BigInt)
], HeroiAtributoEntity.prototype, "idHeroi", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int8', name: 'attribute_id' }),
    __metadata("design:type", BigInt)
], HeroiAtributoEntity.prototype, "idAtributo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'attribute_value' }),
    __metadata("design:type", Number)
], HeroiAtributoEntity.prototype, "valorAtributo", void 0);
exports.HeroiAtributoEntity = HeroiAtributoEntity = __decorate([
    (0, typeorm_1.Entity)({ database: 'POSTGRES', name: 'hero_attribute' })
], HeroiAtributoEntity);
//# sourceMappingURL=heroi.atributo.entity.js.map