import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AtributoService } from '../services/atributo.service';
import { ParametrosCadastroAtributoResponseDto } from '../dtos/parametros.cadastro.atributo.response.dto';
import { AtributoHeroiResponseDto } from '../dtos/atributo.heroi.response.dto';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { CadastroAtributoRequestDto } from '../dtos/cadastro.atributo.request.dto';
import { AtualizaAtributoHeroiRequestDto } from '../dtos/atualiza.atributo.heroi.request.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('atributo')
@ApiBearerAuth()
@Controller('superheroi/atributo')
@UseGuards(AutenticacaoGuard)
@ApiUnauthorizedResponse()
export class AtributoController {

    constructor( private readonly atributoService: AtributoService ) {  }

    @Get('parametros-para-cadastro-e-atualizacao')
    @ApiOkResponse()
    async pegarTodosAtributosDisponiveis( ) : Promise<ParametrosCadastroAtributoResponseDto[]> {
        return await this.atributoService.pegarTodosAtributosDisponiveis(  );
    }


    @Get('lista-atributos-heroi/:idHeroi')
    @UsePipes(new ValidationPipe())
    @ApiOkResponse()
    @ApiBadRequestResponse()
    async listarTodosPorHeroi( @Param('idHeroi') id: bigint ): Promise<AtributoHeroiResponseDto[]> {
        return await this.atributoService.pegarTodosAtributosPorHeroi( id );
    }

    @Post('')
    @UsePipes(new ValidationPipe())
    @ApiCreatedResponse()
    @ApiConflictResponse()
    @ApiBadRequestResponse()
    async cadastrarAtributoHeroi( @Body() cadastroAtributoRequestDto :CadastroAtributoRequestDto ) {
        return await this.atributoService.cadastrarAtributoHeroi( cadastroAtributoRequestDto );
    }

    @Put('edita')
    @UsePipes(new ValidationPipe())
    @ApiBadRequestResponse()
    @ApiOkResponse()
    async editarAtributoHeroi( @Body() atualizaAtributoHeroiRequestDto: AtualizaAtributoHeroiRequestDto ) {
        return await this.atributoService.editarAtributoHeroi( atualizaAtributoHeroiRequestDto );
    }

    @Delete('deleta/:idAtributo/:idHeroi')
    @UsePipes(new ValidationPipe())
    @ApiOkResponse()
    @ApiBadRequestResponse()
    async deletarAtributoHeroi(@Param('idAtributo') idAtributo: bigint, @Param('idHeroi') idHeroi: bigint) {
        return await this.atributoService.deletarAtributoHeroi( idAtributo, idHeroi );
    }

}
