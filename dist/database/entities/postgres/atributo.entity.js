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
exports.AtributoEntity = void 0;
const heroi_atributo_entity_1 = require("./heroi.atributo.entity");
const typeorm_1 = require("typeorm");
let AtributoEntity = class AtributoEntity {
};
exports.AtributoEntity = AtributoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", BigInt)
], AtributoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'attribute_name' }),
    __metadata("design:type", String)
], AtributoEntity.prototype, "nomeAtributo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => heroi_atributo_entity_1.HeroiAtributoEntity, heroiAtributo => heroiAtributo.atributo),
    __metadata("design:type", Array)
], AtributoEntity.prototype, "heroiAtributos", void 0);
exports.AtributoEntity = AtributoEntity = __decorate([
    (0, typeorm_1.Entity)({ database: 'POSTGRES', name: 'attribute' })
], AtributoEntity);
//# sourceMappingURL=atributo.entity.js.map