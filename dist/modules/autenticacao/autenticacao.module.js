"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacaoModule = void 0;
const common_1 = require("@nestjs/common");
const usuario_module_1 = require("../usuario/usuario.module");
const autenticacao_service_1 = require("./services/autenticacao.service");
const autenticacao_controller_1 = require("./controllers/autenticacao.controller");
const jwt_1 = require("@nestjs/jwt");
const dist_1 = require("@nestjs/config/dist");
const log_module_1 = require("../../common/log/log.module");
let AutenticacaoModule = class AutenticacaoModule {
};
exports.AutenticacaoModule = AutenticacaoModule;
exports.AutenticacaoModule = AutenticacaoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: +configService.get('JWT_EXPIRATION_TIME') }
                }),
                inject: [dist_1.ConfigService],
            }),
            usuario_module_1.UsuarioModule,
            log_module_1.LogModule
        ],
        providers: [autenticacao_service_1.AutenticacaoService],
        controllers: [autenticacao_controller_1.AutenticacaoController]
    })
], AutenticacaoModule);
//# sourceMappingURL=autenticacao.module.js.map