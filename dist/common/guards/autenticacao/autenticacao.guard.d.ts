import { ConfigService } from '@nestjs/config/dist';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { Cache } from '@nestjs/cache-manager';
export declare class AutenticacaoGuard implements CanActivate {
    private cacheManager;
    private readonly jwtService;
    private readonly configService;
    private readonly usuarioService;
    private jwtSecret;
    constructor(cacheManager: Cache, jwtService: JwtService, configService: ConfigService, usuarioService: UsuarioService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
