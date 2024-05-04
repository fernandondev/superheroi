import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AtributoService } from '../services/atributo.service';
import { ParametrosCadastroAtributoResponseDto } from '../dtos/parametros.cadastro.atributo.response.dto';
import { AtributoHeroiResponseDto } from '../dtos/atributo.heroi.response.dto';
import {  AtributoHeroiRequestDtoParameters } from '../dtos/atributo.heroi.request.dto';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { CadastroAtributoRequestDto } from '../dtos/cadastro.atributo.request.dto';
import { AtualizaAtributoHeroiRequestDto } from '../dtos/atualiza.atributo.heroi.request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('atributo')
@Controller('superheroi/atributo')
@UseGuards(AutenticacaoGuard)
export class AtributoController {

    constructor( private readonly atributoService: AtributoService ) {  }

    @Get('parametros-para-cadastro-e-atualizacao')
    async pegarTodosAtributosDisponiveis( ) : Promise<ParametrosCadastroAtributoResponseDto[]> {
        return await this.atributoService.pegarTodosAtributosDisponiveis(  );
    }


    @Get('lista-atributos-heroi/:id')
    @UsePipes(new ValidationPipe())
    async listarTodosPorHeroi( @Param('id') id: bigint ): Promise<AtributoHeroiResponseDto[]> {
        return await this.atributoService.pegarTodosAtributosPorHeroi( id );
    }

    @Post('')
    @UsePipes(new ValidationPipe())
    async cadastrarAtributoHeroi( @Body() cadastroAtributoRequestDto :CadastroAtributoRequestDto ) {
        return await this.atributoService.cadastrarAtributoHeroi( cadastroAtributoRequestDto );
    }

    @Put('edita')
    @UsePipes(new ValidationPipe())
    async editarAtributoHeroi( @Body() atualizaAtributoHeroiRequestDto: AtualizaAtributoHeroiRequestDto ) {
        return await this.atributoService.editarAtributoHeroi( atualizaAtributoHeroiRequestDto );
    }

    @Delete('deleta/:idAtributo/:idHeroi')
    @UsePipes(new ValidationPipe())
    async deletarAtributoHeroi(@Param('idAtributo') idAtributo: bigint, @Param('idHeroi') idHeroi: bigint) {
        return await this.atributoService.deletarAtributoHeroi( idAtributo, idHeroi );
    }

}
