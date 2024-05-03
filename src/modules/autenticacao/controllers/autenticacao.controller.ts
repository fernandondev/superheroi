import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, Headers } from '@nestjs/common';
import { AutenticacaoService } from '../services/autenticacao.service';
import { AutenticacaoResponseDto } from '../dtos/autenticacao.response.dto';
import { AutenticacaoLoginRequestDto } from '../dtos/autenticacao.login.request.dto';
import { AutenticacaoRenovaTokenRequestDto } from '../dtos/autenticacao.renova.token.request.dto';
import { AutenticacaoRenovaTokenResponseDto } from '../dtos/autenticacao.renova.token.response.dto';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('autenticacao')
@Controller('autenticacao')
export class AutenticacaoController {

    constructor( private readonly autenticacaoService: AutenticacaoService ) {  }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login( @Body() autenticacaoLoginRequestDto: AutenticacaoLoginRequestDto ): Promise<AutenticacaoResponseDto> {
        return await this.autenticacaoService.login( autenticacaoLoginRequestDto );
    }

    @Get('logout')
    @UseGuards(AutenticacaoGuard)
    async logout(  @Headers('Authorization') accessToken: string ) {
        return await this.autenticacaoService.logout( accessToken );
    }

    @Get('inativar-usuario')
    @UseGuards(AutenticacaoGuard)
    async inativarUsuario(  @Headers('Authorization') accessToken: string) {
        return await this.autenticacaoService.inativarUsuario( accessToken );
    }

    @Post('jwt/reautenticar')
    @UsePipes( new ValidationPipe() )
    async reautenticar( @Body() autenticacaoRenovaTokenRequestDto: AutenticacaoRenovaTokenRequestDto ): Promise<AutenticacaoResponseDto> {
        return await this.autenticacaoService.reautenticar( autenticacaoRenovaTokenRequestDto );
    }

}
