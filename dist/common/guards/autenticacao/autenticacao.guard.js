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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacaoGuard = void 0;
const dist_1 = require("@nestjs/config/dist");
const dist_2 = require("@nestjs/jwt/dist");
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../../../modules/usuario/services/usuario.service");
const cache_manager_1 = require("@nestjs/cache-manager");
let AutenticacaoGuard = class AutenticacaoGuard {
    constructor(cacheManager, jwtService, configService, usuarioService) {
        this.cacheManager = cacheManager;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usuarioService = usuarioService;
        this.jwtSecret = this.configService.get('JWT_SECRET');
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.jwtSecret
            });
            request['user'] = payload;
            const usuarioEncontrado = await this.usuarioService.pesquisarPorCpf(payload['cpf']);
            if (usuarioEncontrado.iatUltimoToken.getTime() != +payload['iat']) {
                throw new common_1.UnauthorizedException({ message: 'Token inválido!' });
            }
            if (!usuarioEncontrado.ativo) {
                throw new common_1.UnauthorizedException({ message: 'Usuário inativo!' });
            }
            const tokenBlackList = await this.cacheManager.get(usuarioEncontrado.id);
            if (tokenBlackList) {
                throw new common_1.UnauthorizedException({ message: 'Usuário deslogado, favor logar novamente!' });
            }
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AutenticacaoGuard = AutenticacaoGuard;
exports.AutenticacaoGuard = AutenticacaoGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cache_manager_1.Cache,
        dist_2.JwtService,
        dist_1.ConfigService,
        usuario_service_1.UsuarioService])
], AutenticacaoGuard);
//# sourceMappingURL=autenticacao.guard.js.map