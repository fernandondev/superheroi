import { ConfigService } from '@nestjs/config/dist';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  private jwtSecret: string;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService, 
    private readonly usuarioService: UsuarioService
  
  ) { 
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
   }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> { 
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token, {
          secret: this.jwtSecret
        }
      );

      request['user'] = payload;
      //Permite que só seja usado apenas um token válido por usuário
      const usuarioEncontrado = await this.usuarioService.pesquisarPorCpf( payload['cpf'] );
      if( usuarioEncontrado.iatUltimoToken.getTime() != +payload['iat'] ) {
        throw new UnauthorizedException({ message: 'Token inválido!' });
      }

      if( !usuarioEncontrado.ativo ){
        throw new UnauthorizedException({ message: 'Usuário inativo!' });
      }
      
      //Verifica se o token está na blacklist (usuário deslogado)
      const tokenBlackList = await this.cacheManager.get( usuarioEncontrado.id );
      if ( tokenBlackList ) {
        throw new UnauthorizedException({ message: 'Usuário deslogado, favor logar novamente!' });
      }


    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request : Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
