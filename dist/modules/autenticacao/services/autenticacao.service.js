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
exports.AutenticacaoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const usuario_service_1 = require("../../usuario/services/usuario.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const log_service_1 = require("../../../common/log/log.service");
const log_enum_1 = require("../../../common/log/models/enums/log.enum");
let AutenticacaoService = class AutenticacaoService {
    constructor(cacheManager, usuarioService, jwtService, configService, logService) {
        this.cacheManager = cacheManager;
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logService = logService;
        this.jwtTempoDeExipiracao = +this.configService.get('JWT_EXPIRATION_TIME');
        this.jwtRefreshSecret = this.configService.get('JWT_REFRESH_SECRET');
        this.jwtRefreshTempoDeExpiracao = +this.configService.get('JWT_REFRESH_EXPIRATION_TIME');
    }
    async login(autenticacaoLoginRequestDto) {
        const usuarioEncontrado = await this.usuarioService.pesquisarPorEmailOuCpf(autenticacaoLoginRequestDto.email, autenticacaoLoginRequestDto.cpf);
        if (!usuarioEncontrado || !(0, bcrypt_1.compareSync)(autenticacaoLoginRequestDto.senha, usuarioEncontrado.senha)) {
            throw new common_1.UnauthorizedException({ message: 'Credenciais incorretas!' });
        }
        if (!usuarioEncontrado.ativo) {
            throw new common_1.UnauthorizedException({ message: 'Usuário inativo!' });
        }
        const iatDate = new Date();
        const payload = { sub: usuarioEncontrado.id, cpf: usuarioEncontrado.cpf, iat: iatDate.getTime() };
        const autenticacaoResponseDto = await this.gerarToken(payload);
        this.usuarioService.atualizarIat(usuarioEncontrado.id, iatDate);
        await this.cacheManager.del(usuarioEncontrado.id);
        this.logService.gravarLog(`AutenticacaoService->login( autenticacaoLoginRequestDto)    Usuário ${usuarioEncontrado.id} logado`, log_enum_1.LogEnum.INFO);
        return autenticacaoResponseDto;
    }
    async reautenticar(autenticacaoRenovaTokenRequestDto) {
        const usuarioEncontrado = await this.verificarRefreshToken(autenticacaoRenovaTokenRequestDto.refresh_token);
        if (!usuarioEncontrado || !usuarioEncontrado.ativo) {
            throw new common_1.UnauthorizedException({ message: 'Usuário inativo!' });
        }
        const iatDate = new Date();
        const payload = { sub: usuarioEncontrado.id, cpf: usuarioEncontrado.cpf, iat: iatDate.getTime() };
        const autenticacaoResponseDto = await this.gerarToken(payload);
        await this.usuarioService.atualizarIat(usuarioEncontrado.id, iatDate);
        this.logService.gravarLog(`AutenticacaoService->reautenticar( autenticacaoRenovaTokenRequestDto)  Usuário ${usuarioEncontrado.id} reautenticado`, log_enum_1.LogEnum.INFO);
        return await this.gerarToken(payload);
    }
    async logout(accessToken) {
        const usuarioEncontrado = await this.pegarUsuarioPorToken(accessToken.replace('Bearer ', ''));
        await this.cacheManager.set(usuarioEncontrado.id, accessToken, this.jwtTempoDeExipiracao);
        this.logService.gravarLog(` AutenticacaoService->logout()   Usuário ${usuarioEncontrado.id} deslogado`, log_enum_1.LogEnum.INFO);
    }
    async inativarUsuario(accessToken) {
        const usuarioEncontrado = await this.pegarUsuarioPorToken(accessToken.replace('Bearer ', ''));
        this.usuarioService.desativarUsuario(usuarioEncontrado.id);
        await this.logout(accessToken);
        this.logService.gravarLog(` AutenticacaoService->inativarUsuario( accessToken )   Usuário ${usuarioEncontrado.id} deslogado`, log_enum_1.LogEnum.INFO);
    }
    async gerarToken(payload) {
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.jwtRefreshSecret,
            expiresIn: this.jwtRefreshTempoDeExpiracao
        });
        return { access_token: accessToken, refresh_token: refreshToken, expiresIn: this.jwtTempoDeExipiracao };
    }
    async verificarRefreshToken(refreshToken) {
        if (!refreshToken) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const cpf = this.jwtService.decode(refreshToken)['cpf'];
        const usuario = await this.usuarioService.pesquisarPorCpf(cpf);
        if (!usuario) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        try {
            this.jwtService.verify(refreshToken, {
                secret: this.jwtRefreshSecret,
            });
            return usuario;
        }
        catch (err) {
            if (err.name === 'JsonWebTokenError') {
                throw new common_1.UnauthorizedException('Assinatura Inválida');
            }
            if (err.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Token Expirado');
            }
            throw new common_1.UnauthorizedException(err.name);
        }
    }
    async pegarUsuarioPorToken(accessToken) {
        let cpfUsuario = this.jwtService.decode(accessToken)['cpf'];
        const usuarioEncontrado = await this.usuarioService.pesquisarPorCpf(cpfUsuario);
        return usuarioEncontrado;
    }
};
exports.AutenticacaoService = AutenticacaoService;
exports.AutenticacaoService = AutenticacaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cache_manager_1.Cache,
        usuario_service_1.UsuarioService,
        jwt_1.JwtService,
        config_1.ConfigService,
        log_service_1.LogService])
], AutenticacaoService);
//# sourceMappingURL=autenticacao.service.js.map