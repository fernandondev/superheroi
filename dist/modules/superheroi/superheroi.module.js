"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperheroiModule = void 0;
const common_1 = require("@nestjs/common");
const log_module_1 = require("../../common/log/log.module");
const superheroi_service_1 = require("./services/superheroi.service");
const superheroi_controller_1 = require("./controllers/superheroi.controller");
const typeorm_1 = require("@nestjs/typeorm");
const alinhamento_entity_1 = require("../../database/entities/postgres/alinhamento.entity");
const atributo_entity_1 = require("../../database/entities/postgres/atributo.entity");
const cor_entity_1 = require("../../database/entities/postgres/cor.entity");
const editora_entity_1 = require("../../database/entities/postgres/editora.entity");
const genero_entity_1 = require("../../database/entities/postgres/genero.entity");
const heroi_atributo_entity_1 = require("../../database/entities/postgres/heroi.atributo.entity");
const poder_entity_1 = require("../../database/entities/postgres/poder.entity");
const raca_entity_1 = require("../../database/entities/postgres/raca.entity");
const super_heroi_entity_1 = require("../../database/entities/postgres/super.heroi.entity");
const usuario_module_1 = require("../usuario/usuario.module");
let SuperheroiModule = class SuperheroiModule {
};
exports.SuperheroiModule = SuperheroiModule;
exports.SuperheroiModule = SuperheroiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            log_module_1.LogModule,
            typeorm_1.TypeOrmModule.forFeature([
                alinhamento_entity_1.AlinhamentoEntity,
                atributo_entity_1.AtributoEntity,
                cor_entity_1.CorEntity,
                editora_entity_1.EditoraEntity,
                genero_entity_1.GeneroEntity,
                heroi_atributo_entity_1.HeroiAtributoEntity,
                poder_entity_1.PoderEntity,
                raca_entity_1.RacaEntity,
                super_heroi_entity_1.SuperHeroiEntity
            ], 'POSTGRES'),
            usuario_module_1.UsuarioModule
        ],
        providers: [superheroi_service_1.SuperheroiService],
        controllers: [superheroi_controller_1.SuperheroiController]
    })
], SuperheroiModule);
//# sourceMappingURL=superheroi.module.js.map