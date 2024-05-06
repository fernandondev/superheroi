import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, Headers } from '@nestjs/common';
import { AutenticacaoService } from '../services/autenticacao.service';
import { AutenticacaoResponseDto } from '../dtos/autenticacao.response.dto';
import { AutenticacaoLoginRequestDto } from '../dtos/autenticacao.login.request.dto';
import { AutenticacaoRenovaTokenRequestDto } from '../dtos/autenticacao.renova.token.request.dto';
import { AutenticacaoRenovaTokenResponseDto } from '../dtos/autenticacao.renova.token.response.dto';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('autenticacao')
@Controller('autenticacao')
export class AutenticacaoController {

    constructor( private readonly autenticacaoService: AutenticacaoService ) {  }

    @Post('login')
    @UsePipes(new ValidationPipe())
    @ApiUnauthorizedResponse()
    @ApiOkResponse({description: 'Caso o usuário exista e for logado.', type: AutenticacaoResponseDto})
    @ApiBadRequestResponse()
    async login( @Body() autenticacaoLoginRequestDto: AutenticacaoLoginRequestDto ): Promise<AutenticacaoResponseDto> {
        return await this.autenticacaoService.login( autenticacaoLoginRequestDto );
    }

    @ApiBearerAuth()
    @Get('logout')
    @UseGuards(AutenticacaoGuard)
    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    async logout(  @Headers('Authorization') accessToken: string ) {
        return await this.autenticacaoService.logout( accessToken );
    }

    @ApiBearerAuth()
    @Get('inativa-usuario')
    @UseGuards(AutenticacaoGuard)
    @ApiOkResponse()
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    async inativarUsuario(  @Headers('Authorization') accessToken: string) {
        return await this.autenticacaoService.inativarUsuario( accessToken );
    }

    @ApiBearerAuth()
    @Post('jwt/reautentica')
    @UsePipes( new ValidationPipe() )
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse({description: 'Caso o usuário exista e for reautenticado.', type: AutenticacaoResponseDto})
    async reautenticar( @Body() autenticacaoRenovaTokenRequestDto: AutenticacaoRenovaTokenRequestDto ): Promise<AutenticacaoResponseDto> {
        return await this.autenticacaoService.reautenticar( autenticacaoRenovaTokenRequestDto );
    }

}
