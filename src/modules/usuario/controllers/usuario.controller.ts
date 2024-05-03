import { Body, Controller, Get, GoneException, Logger, Param, Post, Put, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CriarUsuarioRequestDto } from '../dtos/criar.usuario.request.dto';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { UsuarioDto, UsuarioPutParameters } from '../dtos/usuario.dto';
import { AtualizarUsuarioRequestDto } from '../dtos/atualizar.usuario.request.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { LogService } from 'src/common/log/log.service';
import { CapturaTodasAsExcecoes } from 'src/common/exceptions/exceptions-filter/captura.todas.excecoes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {

    
    constructor( 
        private readonly usuarioService: UsuarioService,     
    ) {  }

    @Post()
    @UsePipes(new ValidationPipe())
    async criar( @Body() usuario: CriarUsuarioRequestDto ) {
        return await this.usuarioService.criar( usuario );
    }

    @Get('/:id')
    @UseGuards(AutenticacaoGuard)
    async pesquisarPorId( @Param('id') id: string  ) : Promise<UsuarioDto> {
        return await this.usuarioService.pesquisarPorId( id );
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AutenticacaoGuard)
    async atualizar( @Param() params: UsuarioPutParameters, @Body() usuario: AtualizarUsuarioRequestDto  ) {
        return await this.usuarioService.atualizar( params.id, usuario );
    }


}
