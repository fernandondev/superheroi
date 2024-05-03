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
exports.SuperHeroiEntity = void 0;
const typeorm_1 = require("typeorm");
const genero_entity_1 = require("./genero.entity");
const cor_entity_1 = require("./cor.entity");
const raca_entity_1 = require("./raca.entity");
const editora_entity_1 = require("./editora.entity");
const alinhamento_entity_1 = require("./alinhamento.entity");
const atributo_entity_1 = require("./atributo.entity");
const poder_entity_1 = require("./poder.entity");
let SuperHeroiEntity = class SuperHeroiEntity {
};
exports.SuperHeroiEntity = SuperHeroiEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", BigInt)
], SuperHeroiEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'superhero_name' }),
    __metadata("design:type", String)
], SuperHeroiEntity.prototype, "nomeSuperHeroi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'full_name' }),
    __metadata("design:type", String)
], SuperHeroiEntity.prototype, "nomeCompleto", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => genero_entity_1.GeneroEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'gender_id' }),
    __metadata("design:type", genero_entity_1.GeneroEntity)
], SuperHeroiEntity.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cor_entity_1.CorEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'eye_colour_id' }),
    __metadata("design:type", cor_entity_1.CorEntity)
], SuperHeroiEntity.prototype, "corDoOlho", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cor_entity_1.CorEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'hair_colour_id' }),
    __metadata("design:type", cor_entity_1.CorEntity)
], SuperHeroiEntity.prototype, "corDoCabelo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cor_entity_1.CorEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'skin_colour_id' }),
    __metadata("design:type", cor_entity_1.CorEntity)
], SuperHeroiEntity.prototype, "corDaPele", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => raca_entity_1.RacaEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'race_id' }),
    __metadata("design:type", raca_entity_1.RacaEntity)
], SuperHeroiEntity.prototype, "raca", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => editora_entity_1.EditoraEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'publisher_id' }),
    __metadata("design:type", editora_entity_1.EditoraEntity)
], SuperHeroiEntity.prototype, "editora", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => alinhamento_entity_1.AlinhamentoEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'alignment_id' }),
    __metadata("design:type", alinhamento_entity_1.AlinhamentoEntity)
], SuperHeroiEntity.prototype, "alinhamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'height_cm' }),
    __metadata("design:type", Number)
], SuperHeroiEntity.prototype, "altura", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'weight_kg' }),
    __metadata("design:type", Number)
], SuperHeroiEntity.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => atributo_entity_1.AtributoEntity),
    (0, typeorm_1.JoinTable)({
        name: 'hero_attribute',
        joinColumn: { name: 'hero_id' },
        inverseJoinColumn: { name: 'attribute_id' }
    }),
    __metadata("design:type", Array)
], SuperHeroiEntity.prototype, "atributos", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => poder_entity_1.PoderEntity),
    (0, typeorm_1.JoinTable)({
        name: 'hero_power',
        joinColumn: { name: 'hero_id' },
        inverseJoinColumn: { name: 'power_id' }
    }),
    __metadata("design:type", Array)
], SuperHeroiEntity.prototype, "poderes", void 0);
exports.SuperHeroiEntity = SuperHeroiEntity = __decorate([
    (0, typeorm_1.Entity)({ database: 'POSTGRES', name: 'superhero' })
], SuperHeroiEntity);
//# sourceMappingURL=super.heroi.entity.js.map