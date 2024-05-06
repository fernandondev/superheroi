import {  Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import {compareSync as bcryptCompareSync} from 'bcryptjs';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { AutenticacaoResponseDto } from '../dtos/autenticacao.response.dto';
import { AutenticacaoLoginRequestDto } from '../dtos/autenticacao.login.request.dto';
import { AutenticacaoRenovaTokenRequestDto } from '../dtos/autenticacao.renova.token.request.dto';
import { AutenticacaoRenovaTokenResponseDto } from '../dtos/autenticacao.renova.token.response.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { LogService } from 'src/common/log/log.service';
import { LogEnum } from 'src/common/log/models/enums/log.enum';

@Injectable()
export class AutenticacaoService {

    private jwtTempoDeExipiracao: number;
    private jwtRefreshSecret: string;
    private jwtRefreshTempoDeExpiracao: number;

    constructor( 
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly logService: LogService
     ) {
        this.jwtTempoDeExipiracao = +this.configService.get<number>('JWT_EXPIRATION_TIME');
        this.jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
        this.jwtRefreshTempoDeExpiracao = +this.configService.get<number>('JWT_REFRESH_EXPIRATION_TIME');
    }
    
    /**
     * Autentica o usuário e retorna o access token, refresh token e informa o tempo de espiração
     */
    async login( autenticacaoLoginRequestDto: AutenticacaoLoginRequestDto ): Promise<AutenticacaoResponseDto> {

        const usuarioEncontrado = await this.usuarioService.pesquisarPorEmailOuCpf( autenticacaoLoginRequestDto.email, autenticacaoLoginRequestDto.cpf );

        //Verifica se a senha corresponde ao hash bcrypt da senha armazenada no banco de dados
        if( !usuarioEncontrado || !bcryptCompareSync( autenticacaoLoginRequestDto.senha, usuarioEncontrado.senha )) {
            throw new UnauthorizedException({ message: 'Credenciais incorretas!' });
        }

        if( !usuarioEncontrado.ativo ){
          throw new UnauthorizedException({ message: 'Usuário inativo!' });
        }

        const iatDate = new Date();

        const payload = { sub: usuarioEncontrado.id, cpf : usuarioEncontrado.cpf, iat: iatDate.getTime() };
        const autenticacaoResponseDto = await this.gerarToken( payload );
        //Atualiza iat na tabela usuário
        this.usuarioService.atualizarIat( usuarioEncontrado.id, iatDate  );
        //Remove token da blacklist (usuário deslogado) se estiver
        await this.cacheManager.del( usuarioEncontrado.id );

        this.logService.gravarLog( `Usuário ${usuarioEncontrado.id} logado`, LogEnum.INFO );

        return autenticacaoResponseDto
    }

    /**
     * Renova a autenticação do usuário a partir do refresh token
     */
    async reautenticar( autenticacaoRenovaTokenRequestDto: AutenticacaoRenovaTokenRequestDto ): Promise<AutenticacaoResponseDto> {
        const usuarioEncontrado = await this.verificarRefreshToken( autenticacaoRenovaTokenRequestDto.refresh_token ); 

        if( !usuarioEncontrado  || !usuarioEncontrado.ativo ){
          throw new UnauthorizedException({ message: 'Usuário inativo!' });
        }
        const iatDate = new Date();
        const payload = { sub: usuarioEncontrado.id, cpf : usuarioEncontrado.cpf, iat: iatDate.getTime() };

        const autenticacaoResponseDto = await this.gerarToken( payload );
        //Atualiza iat na tabela usuário
        await this.usuarioService.atualizarIat( usuarioEncontrado.id, iatDate  );

        this.logService.gravarLog( `Usuário ${usuarioEncontrado.id} reautenticado`, LogEnum.INFO );

        return await this.gerarToken( payload );
    }

    /**
     * 
     * @param id 
     * @param accessToken 
     * 
     * Para logout, nós inseriremos o token deslogado em uma blacklist, 
     * utilizando o módulo de cache.
     * Como só permitimos apenas um token por usuário, apenas inserí-lo
     * na blacklist será suficiente.
     */
    async logout( accessToken: string ) {
        const usuarioEncontrado = await this.pegarUsuarioPorToken( accessToken.replace('Bearer ', '') );
        await this.cacheManager.set( usuarioEncontrado.id, accessToken, this.jwtTempoDeExipiracao);
        this.logService.gravarLog( `Usuário ${usuarioEncontrado.id} deslogado`, LogEnum.INFO );
    }

    async inativarUsuario( accessToken: string ) {
        const usuarioEncontrado = await this.pegarUsuarioPorToken( accessToken.replace('Bearer ', '') );
        this.usuarioService.desativarUsuario( usuarioEncontrado.id );
        await this.logout( accessToken );
        this.logService.gravarLog( `Usuário ${usuarioEncontrado.id} desativado`, LogEnum.INFO );

    }

    private async gerarToken( payload ): Promise<AutenticacaoResponseDto> {
        const accessToken = this.jwtService.sign( payload );
        const refreshToken = this.jwtService.sign(
          payload,
          {
            secret: this.jwtRefreshSecret,
            expiresIn: this.jwtRefreshTempoDeExpiracao
          },
        );
        return { access_token: accessToken, refresh_token: refreshToken, expiresIn: this.jwtTempoDeExipiracao };
    }

    private async verificarRefreshToken( refreshToken: string )  {
    
        if (!refreshToken) {
          throw new NotFoundException('Usuário não encontrado');
        }
    
        const cpf = this.jwtService.decode( refreshToken )['cpf'];
        const usuario = await this.usuarioService.pesquisarPorCpf( cpf );
      
          if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }
    
        try {
          this.jwtService.verify(refreshToken, {
            secret: this.jwtRefreshSecret,
          });
        return usuario;
        } catch (err) {
          if (err.name === 'JsonWebTokenError') {
            throw new UnauthorizedException('Assinatura Inválida');
          }
          if (err.name === 'TokenExpiredError') {
            throw new UnauthorizedException('Token Expirado');
          }
          throw new UnauthorizedException(err.name);
        }
      }

      async pegarUsuarioPorToken( accessToken: string ) {
        let cpfUsuario = this.jwtService.decode( accessToken )['cpf'];
        const usuarioEncontrado = await this.usuarioService.pesquisarPorCpf( cpfUsuario );
        return usuarioEncontrado;
      }


}
