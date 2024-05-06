import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PoderService } from '../services/poder.service';
import { ParametrosCadastroPoderResponseDto } from '../dtos/parametros.cadastro.poder.response.dto';
import { PoderHeroiResponseDto } from '../dtos/poder.heroi.response.dto';
import { CadastroPoderRequestDto } from '../dtos/cadastro.poder.request.dto';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


@ApiTags('poder')
@ApiBearerAuth()
@Controller('superheroi/poder')
@UseGuards(AutenticacaoGuard)
@ApiUnauthorizedResponse()
export class PoderController {

    constructor( private readonly poderService: PoderService ) {  }

    @Get('parametros-para-cadastro-e-atualizacao')
    @ApiOkResponse()
    async pegarTodosPoderesDisponiveis( ) : Promise<ParametrosCadastroPoderResponseDto[]> {
        return await this.poderService.pegarTodosPoderesDisponiveis(  );
    }


    @Get('lista-poderes-heroi/:idHeroi')
    @UsePipes(new ValidationPipe())
    @ApiOkResponse()
    @ApiBadGatewayResponse()
    async listarTodosPorHeroi( @Param('idHeroi') idHeroi: bigint ): Promise<PoderHeroiResponseDto[]> {
        return await this.poderService.pegarTodosPoderesPorHeroi( idHeroi );
    }
    
    @Post('')
    @UsePipes(new ValidationPipe())
    @ApiCreatedResponse()
    @ApiBadRequestResponse()
    @ApiConflictResponse()
    async cadastrarPoderHeroi( @Body() cadastroPoderRequestDto :CadastroPoderRequestDto ) {
        return await this.poderService.cadastrarPoderHeroi( cadastroPoderRequestDto );
    }

    @Delete('deleta/:idPoder/:idHeroi')
    @UsePipes(new ValidationPipe())
    @ApiOkResponse()
    @ApiBadRequestResponse()
    async deletarPoderHeroi(@Param('idPoder') idPoder: bigint, @Param('idHeroi') idHeroi: bigint) {
        return await this.poderService.deletarPoderHeroi( idPoder, idHeroi );
    }

}
