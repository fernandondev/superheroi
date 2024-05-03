"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const usuario_module_1 = require("./modules/usuario/usuario.module");
const config_1 = require("@nestjs/config");
const db_module_1 = require("./database/db.module");
const autenticacao_module_1 = require("./modules/autenticacao/autenticacao.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const log_module_1 = require("./common/log/log.module");
const superheroi_module_1 = require("./modules/superheroi/superheroi.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            usuario_module_1.UsuarioModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            db_module_1.DbModule,
            autenticacao_module_1.AutenticacaoModule,
            log_module_1.LogModule,
            superheroi_module_1.SuperheroiModule,
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 15 * 1000,
            })
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map