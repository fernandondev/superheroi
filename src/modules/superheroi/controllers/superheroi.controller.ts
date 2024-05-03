import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { SuperheroiService } from '../services/superheroi.service';
import { CadastroSuperHeroiRequestDto } from '../dtos/cadastro.super.heroi.request.dto';
import { ParametrosCadastroResponseDto } from '../dtos/parametros.cadastro.response.dto';
import { SuperHeroiResponseDto } from '../dtos/super.heroi.response.dto';
import { AtualizarSuperHeroiParameters, AtualizarSuperHeroiRequestDto } from '../dtos/atualizar.super.heroi.request.dto';
import { DeleteSuperHeroiParameter } from '../dtos/delete.super.heroi.parameter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('superheroi')
@Controller('superheroi')
@UseGuards(AutenticacaoGuard)
export class SuperheroiController {

    constructor( private readonly superHeroiService: SuperheroiService ) {  }

    @Get('parametros-para-cadastro-e-atualizacao')
    async pegarParametrosCadastro( ) : Promise<ParametrosCadastroResponseDto> {
        return await this.superHeroiService.pegarParametrosCadastro( );
    }

    @Get()
    @UsePipes(new ValidationPipe())
    async listarTodos(): Promise<SuperHeroiResponseDto[]> {
        return await this.superHeroiService.listarTodosSuperHerois();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async cadastrarSuperHeroi( @Body() cadastroSuperHeroiRequestDto : CadastroSuperHeroiRequestDto ) {
        return await this.superHeroiService.cadastrarSuperHeroi( cadastroSuperHeroiRequestDto )
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    async atualizarSuperHeroi( @Param() params: AtualizarSuperHeroiParameters, @Body() superHeroi: AtualizarSuperHeroiRequestDto  ) {
        return await this.superHeroiService.atualizarSuperHeroi( params.id, superHeroi );
    }

    @Delete('/:id')
    @UsePipes(new ValidationPipe())
    async deletarSuperHeroi(@Param('id') params: DeleteSuperHeroiParameter) {
        return await this.superHeroiService.deletarSuperHeroi( params.id );
    }

    

}
