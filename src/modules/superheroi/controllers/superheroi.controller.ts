import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { SuperheroiService } from '../services/superheroi.service';
import { CadastroSuperHeroiRequestDto } from '../dtos/cadastro.super.heroi.request.dto';
import { ParametrosCadastroResponseDto } from '../dtos/parametros.cadastro.response.dto';
import { SuperHeroiResponseDto } from '../dtos/super.heroi.response.dto';
import { AtualizarSuperHeroiParameters, AtualizarSuperHeroiRequestDto } from '../dtos/atualizar.super.heroi.request.dto';
import { DeleteSuperHeroiParameter } from '../dtos/delete.super.heroi.parameter';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SuperHeroiDetalhadoResponseDto } from '../dtos/super.heroi.detalhado.response.dto';
import { ConfrontoDto } from '../dtos/confronto.dto';
import { FiltroEPaginacaoDto } from '../dtos/paginacao.dto';
import { FiltroConfrontoEditorasRequestDto } from '../dtos/filtro.confronto.editoras.dto';
import { ConfrontoEditoraResponseDto } from '../dtos/confronto.editoras.response.dto';
import { ConfrontoDuasEditorasParametersDto } from '../dtos/confronto.duas.editoras.parameters.dto';

@ApiTags('superheroi')
@ApiBearerAuth()
@Controller('superheroi')
@UseGuards(AutenticacaoGuard)
@ApiUnauthorizedResponse()
export class SuperheroiController {

    constructor( private readonly superHeroiService: SuperheroiService ) {  }

    @Get('parametros-para-cadastro-e-atualizacao')
    @ApiOkResponse({description: 'Retorna todos os parametros (ids) que poderão ser utilizados nos endpoints de atualização ou cadastro',type: ParametrosCadastroResponseDto})
    async pegarParametrosCadastro( ) : Promise<ParametrosCadastroResponseDto> {
        return await this.superHeroiService.pegarParametrosCadastro( );
    }

    @Get('detalhado')
    @UsePipes( new ValidationPipe( { transform: true, transformOptions: {enableImplicitConversion: true} }))
    @ApiResponse({status: 200,description: 'Retorna todos os heróis cadastrados no sistema, com seu detalhamento (poderes e atributos).'})
    async listarTodosDetalhado(@Query() paginacaoDto: FiltroEPaginacaoDto): Promise<SuperHeroiDetalhadoResponseDto[]> {
        return await this.superHeroiService.listarTodosSuperHeroisDetalhado(paginacaoDto);
    }

    @Get('confrontos-todos-herois')
    @UsePipes( new ValidationPipe( { transform: true, transformOptions: {enableImplicitConversion: true} }))
    @ApiOkResponse({description: 'Retorna todos os confrontos entre todos os heróis do sistema, de forma paginada.'})
    async confrontosTodosHerois(@Query() paginacaoDto: FiltroEPaginacaoDto): Promise<ConfrontoDto[]> {
        return await this.superHeroiService.confrontosSuperHerois(paginacaoDto);
    }

    @Get('confronto-todas-editoras')
    @UsePipes( new ValidationPipe( { transform: true, transformOptions: {enableImplicitConversion: true} }))
    @ApiOkResponse({description: 'Retorna o resultado de todos os confrontos entre as editoras cadastradas no sistema.'})
    async confrontoTodasEditoras(@Query() filtroConfrontoEditorasDto: FiltroConfrontoEditorasRequestDto): Promise<ConfrontoEditoraResponseDto[]> {
        return await this.superHeroiService.confrontoTodasEditoras(filtroConfrontoEditorasDto);
    }

     
    @Get('confronto-duas-editoras')
    @UsePipes( new ValidationPipe( { transform: true, transformOptions: {enableImplicitConversion: true} }))
    @ApiOkResponse({description: 'Retorna o resultado entre o confronto entre duas editoras especificadas.'})
    @ApiBadRequestResponse()
    async confrontoDuasEditoras(@Query() confrontoDuasEditorasParametersDto: ConfrontoDuasEditorasParametersDto): Promise<ConfrontoEditoraResponseDto[]> {
        return await this.superHeroiService.confrontoDuasEditoras(confrontoDuasEditorasParametersDto);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiCreatedResponse()
    @ApiConflictResponse()
    @ApiBadRequestResponse()
    async cadastrarSuperHeroi( @Body() cadastroSuperHeroiRequestDto : CadastroSuperHeroiRequestDto ) {
        return await this.superHeroiService.cadastrarSuperHeroi( cadastroSuperHeroiRequestDto )
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true, transformOptions: {enableImplicitConversion: true} }))
    @ApiOkResponse()
    @ApiConflictResponse()
    @ApiBadRequestResponse()
    async atualizarSuperHeroi( @Param() params: AtualizarSuperHeroiParameters, @Body() superHeroi: AtualizarSuperHeroiRequestDto  ) {
        return await this.superHeroiService.atualizarSuperHeroi( BigInt(params.id), superHeroi );
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe({ transform: true, transformOptions: {enableImplicitConversion: true} }))
    @ApiOkResponse()
    @ApiBadRequestResponse()
    async deletarSuperHeroi(@Param() params: DeleteSuperHeroiParameter) {
        return await this.superHeroiService.deletarSuperHeroi( BigInt(params.id) );
    }

    

}
