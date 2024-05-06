import { Body, Controller, Get, GoneException, Logger, Param, Post, Put, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CriarUsuarioRequestDto } from '../dtos/criar.usuario.request.dto';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { UsuarioDto, UsuarioPutParameters } from '../dtos/usuario.dto';
import { AtualizarUsuarioRequestDto } from '../dtos/atualizar.usuario.request.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { LogService } from 'src/common/log/log.service';
import { CapturaTodasAsExcecoes } from 'src/common/exceptions/exceptions-filter/captura.todas.excecoes';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {

    
    constructor( 
        private readonly usuarioService: UsuarioService,     
    ) {  }

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiCreatedResponse()
    @ApiConflictResponse()
    async criar( @Body() usuario: CriarUsuarioRequestDto ) {
        return await this.usuarioService.criar( usuario );
    }

    @ApiBearerAuth()
    @Get('/:id')
    @UseGuards(AutenticacaoGuard)
    @ApiBadRequestResponse()
    @ApiOkResponse({description: 'Caso o usuário exista', type: UsuarioDto})
    @ApiUnauthorizedResponse()
    async pesquisarPorId( @Param('id') id: string  ) : Promise<UsuarioDto> {
        return await this.usuarioService.pesquisarPorId( id );
    }

    @ApiBearerAuth()
    @Put('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AutenticacaoGuard)
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    async atualizar( @Param() params: UsuarioPutParameters, @Body() usuario: AtualizarUsuarioRequestDto  ) {
        return await this.usuarioService.atualizar( params.id, usuario );
    }


}
