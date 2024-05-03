import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { AutenticacaoResponseDto } from '../dtos/autenticacao.response.dto';
import { AutenticacaoLoginRequestDto } from '../dtos/autenticacao.login.request.dto';
import { AutenticacaoRenovaTokenRequestDto } from '../dtos/autenticacao.renova.token.request.dto';
import { Cache } from '@nestjs/cache-manager';
import { LogService } from 'src/common/log/log.service';
export declare class AutenticacaoService {
    private cacheManager;
    private readonly usuarioService;
    private readonly jwtService;
    private readonly configService;
    private readonly logService;
    private jwtTempoDeExipiracao;
    private jwtRefreshSecret;
    private jwtRefreshTempoDeExpiracao;
    constructor(cacheManager: Cache, usuarioService: UsuarioService, jwtService: JwtService, configService: ConfigService, logService: LogService);
    login(autenticacaoLoginRequestDto: AutenticacaoLoginRequestDto): Promise<AutenticacaoResponseDto>;
    reautenticar(autenticacaoRenovaTokenRequestDto: AutenticacaoRenovaTokenRequestDto): Promise<AutenticacaoResponseDto>;
    logout(accessToken: string): Promise<void>;
    inativarUsuario(accessToken: string): Promise<void>;
    private gerarToken;
    private verificarRefreshToken;
    pegarUsuarioPorToken(accessToken: string): Promise<import("../../usuario/dtos/usuario.dto").UsuarioDto>;
}
