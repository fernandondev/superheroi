import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogService } from 'src/common/log/log.service';
import { AtributoEntity } from 'src/database/entities/postgres/atributo.entity';
import { HeroiAtributoEntity } from 'src/database/entities/postgres/heroi.atributo.entity';
import { SuperHeroiEntity } from 'src/database/entities/postgres/super.heroi.entity';
import { Repository } from 'typeorm';
import { ParametrosCadastroAtributoResponseDto } from '../dtos/parametros.cadastro.atributo.response.dto';
import { AtributoHeroiResponseDto } from '../dtos/atributo.heroi.response.dto';
import { CadastroAtributoRequestDto } from '../dtos/cadastro.atributo.request.dto';
import { AtualizaAtributoHeroiRequestDto } from '../dtos/atualiza.atributo.heroi.request.dto';

@Injectable()
export class AtributoService {
    constructor(
        @InjectRepository(AtributoEntity, 'POSTGRES') private readonly atributoEntityRepository : Repository<AtributoEntity>,
        @InjectRepository(HeroiAtributoEntity, 'POSTGRES') private readonly heroiAtributoEntityRepository : Repository<HeroiAtributoEntity>,
        @InjectRepository(SuperHeroiEntity, 'POSTGRES') private readonly superHeroiEntityRepository : Repository<SuperHeroiEntity>,
        private readonly logService: LogService
    ) {  }

    /**
     * Pega todos os parâmetros que serão necessários para o cadastro do atributo
     * @returns Promise<ParametrosCadastroResponseDto>
     */
    async pegarTodosAtributosDisponiveis(  ): Promise<ParametrosCadastroAtributoResponseDto[]> {

        const todosAtributos = await this.atributoEntityRepository.find();
        
        let arrayAtributos = [];
        todosAtributos.forEach( atributo => {
            let parametrosCadastroAtributoResponseDto = new ParametrosCadastroAtributoResponseDto();
            parametrosCadastroAtributoResponseDto.idAtributo = atributo.id;
            parametrosCadastroAtributoResponseDto.nomeAtributo = atributo.nomeAtributo;
            arrayAtributos.push( parametrosCadastroAtributoResponseDto )
        } );

        return arrayAtributos;

    }

    /**
     * 
     * @param idHeroi 
     * Pega todos os atributos(idAtributo, nomeAtributo, valorAtributo) de um determinado heroi
     * @returns AtributoHeroiResponseDto
     */
    async pegarTodosAtributosPorHeroi( idHeroi: bigint ): Promise<AtributoHeroiResponseDto[]> {
        const heroiEncontrado: SuperHeroiEntity = await this.superHeroiEntityRepository.findOne( { where: { id: idHeroi } } );

        if( !heroiEncontrado ) {
            throw new BadRequestException(`Não há um herói com o id: ${idHeroi} cadastrado no sistema!`);
        }

        const atributosHeroiEntity: HeroiAtributoEntity[] = heroiEncontrado.heroiAtributos;

        let arrayAtributosHeroiResponseDto: AtributoHeroiResponseDto[] = [];
        atributosHeroiEntity.forEach( atributoHeroiEntity => {

            let atributoHeroiResponseDto  = new AtributoHeroiResponseDto();
            atributoHeroiResponseDto.idAtributo = atributoHeroiEntity.idAtributo;
            atributoHeroiResponseDto.nomeAtributo = atributoHeroiEntity.atributo.nomeAtributo;
            atributoHeroiResponseDto.valorAtributo = atributoHeroiEntity.valorAtributo;
            arrayAtributosHeroiResponseDto.push( atributoHeroiResponseDto );

        });

        return arrayAtributosHeroiResponseDto;
    }

    /**
     * 
     * @param cadastroAtributoRequestDto 
     * Vincula o atributo ao herói, se:
     * 1. herói existe
     * 2. herói não possui esse atributo já cadastrado
     * 3. atributo existe
     */
    async cadastrarAtributoHeroi( cadastroAtributoRequestDto :CadastroAtributoRequestDto ) {
        console.log(cadastroAtributoRequestDto);
        const heroiEncontrado = await this.superHeroiEntityRepository.findOne( { where: { id: cadastroAtributoRequestDto.idHeroi } } );

        if( !heroiEncontrado ) {
            throw new BadRequestException(`Não há um herói com o id: ${cadastroAtributoRequestDto.idHeroi} cadastrado no sistema!`);
        }

        const arrayAtributosCorrespondentes = heroiEncontrado.heroiAtributos.filter( heroiAtributo => heroiAtributo.idAtributo === cadastroAtributoRequestDto.idAtributo );

        if( arrayAtributosCorrespondentes.length > 0 ) {
            throw new ConflictException(`Atributo de id: ${cadastroAtributoRequestDto.idAtributo} já cadastrado para esse herói! É possível de alterá-lo no endpoint de edição.`);
        }

        const atributoEntity = await this.atributoEntityRepository.findOne( { where: { id: cadastroAtributoRequestDto.idAtributo } } );

        if ( !atributoEntity ) {
            throw new BadRequestException(`Atributo de id: ${cadastroAtributoRequestDto.idAtributo} não encontrado no sistema.`);
        }

        const heroiAtributoEntityNovo = new HeroiAtributoEntity();
        heroiAtributoEntityNovo.idAtributo = cadastroAtributoRequestDto.idAtributo;
        heroiAtributoEntityNovo.idHeroi = cadastroAtributoRequestDto.idHeroi;
        heroiAtributoEntityNovo.valorAtributo = cadastroAtributoRequestDto.valorAtributo;

        this.heroiAtributoEntityRepository.save( heroiAtributoEntityNovo );

    }

    /**
     * 
     * @param atualizaAtributoHeroiRequestDto 
     * atualiza o valor do atributo do herói, se:
     * 1. herói existe
     * 2. herói possui esse atributo já cadastrado
     * 3. atributo existe
     * 4. Valor do atributo é válido
     */
    async editarAtributoHeroi( atualizaAtributoHeroiRequestDto: AtualizaAtributoHeroiRequestDto ) {

        const heroiEncontrado = await this.superHeroiEntityRepository.findOne( { where: { id: atualizaAtributoHeroiRequestDto.idHeroi } } );

        if( !heroiEncontrado ) {
            throw new BadRequestException(`Não há um herói com o id: ${atualizaAtributoHeroiRequestDto.idHeroi} cadastrado no sistema!`);
        }

        const heroiAtributoEncontrado = await this.heroiAtributoEntityRepository.findOne( { where: {
            idAtributo: atualizaAtributoHeroiRequestDto.idAtributo,
            idHeroi: atualizaAtributoHeroiRequestDto.idHeroi
        } } );

        if( !heroiAtributoEncontrado ) {
            throw new BadRequestException(`Não foi encontrado um atributo com os parâmetros passados!`);
        }
        await this.heroiAtributoEntityRepository.update( 
            { idAtributo: atualizaAtributoHeroiRequestDto.idAtributo, 
                idHeroi: atualizaAtributoHeroiRequestDto.idHeroi 
            }
            , { valorAtributo: atualizaAtributoHeroiRequestDto.valorNovoAtributo } 
        );

    }

    async deletarAtributoHeroi( idAtributo: bigint, idHeroi: bigint ) {

        const heroiEncontrado = await this.superHeroiEntityRepository.findOne( { where: { id: idHeroi } } );

        if( !heroiEncontrado ) {
            throw new BadRequestException(`Não há um herói com o id: ${idHeroi} cadastrado no sistema!`);
        }

        const result = await this.heroiAtributoEntityRepository.delete( { 
            idAtributo: idAtributo,
            idHeroi: idHeroi
        } );

        if (!result.affected){
            throw new BadRequestException( `Não há um atributo com o id: ${idAtributo} para o herói de id: ${idHeroi} cadastrado no sistema!` )
        }

    }

}
