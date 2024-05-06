import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ParametrosCadastroPoderResponseDto } from '../dtos/parametros.cadastro.poder.response.dto';
import { LogService } from 'src/common/log/log.service';
import { PoderEntity } from 'src/database/entities/postgres/poder.entity';
import { Repository } from 'typeorm';
import { SuperHeroiEntity } from 'src/database/entities/postgres/super.heroi.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PoderHeroiResponseDto } from '../dtos/poder.heroi.response.dto';
import { CadastroPoderRequestDto } from '../dtos/cadastro.poder.request.dto';
import { HeroiPoderEntity } from 'src/database/entities/postgres/heroi.poder.entity';
import { LogEnum } from 'src/common/log/models/enums/log.enum';

@Injectable()
export class PoderService {
    constructor(
        @InjectRepository(PoderEntity, 'POSTGRES') private readonly poderEntityRepository : Repository<PoderEntity>,
        @InjectRepository(SuperHeroiEntity, 'POSTGRES') private readonly superHeroiEntityRepository : Repository<SuperHeroiEntity>,
        @InjectRepository(HeroiPoderEntity, 'POSTGRES') private readonly heroiPoderEntityRepository : Repository<HeroiPoderEntity>,
        private readonly logService: LogService
    ) {  }

    /**
     * Pega todos os parâmetros que serão necessários para o cadastro do poder
     * @returns Promise<ParametrosCadastroPoderResponseDto>
     */
    async pegarTodosPoderesDisponiveis(  ): Promise<ParametrosCadastroPoderResponseDto[]> {

        const todosPoderes = await this.poderEntityRepository.find();
        
        let arrayPoderes = [];
        todosPoderes.forEach( poder => {
            let parametrosCadastroPoderResponseDto = new ParametrosCadastroPoderResponseDto();
            parametrosCadastroPoderResponseDto.idPoder = poder.id;
            parametrosCadastroPoderResponseDto.nomePoder = poder.nomePoder;
            arrayPoderes.push( parametrosCadastroPoderResponseDto )
        } );

        return arrayPoderes;

    }

    /**
     * 
     * @param idHeroi 
     * Pega todos os poderes(idPoder, nomePoder) de um determinado heroi
     * @returns PoderHeroiResponseDto[]
     */
    async pegarTodosPoderesPorHeroi( idHeroi: bigint ): Promise<PoderHeroiResponseDto[]> {
        const heroiEncontrado: SuperHeroiEntity = await this.superHeroiEntityRepository.findOne( { where: { id: idHeroi } } );

        if( !heroiEncontrado ) {
            throw new BadRequestException(`Não há um herói com o id: ${idHeroi} cadastrado no sistema!`);
        }

        const poderesHeroiEntity: HeroiPoderEntity[] = heroiEncontrado.heroiPoderes;

        let arrayPoderesHeroiResponseDto: PoderHeroiResponseDto[] = [];
        poderesHeroiEntity.forEach( poderHeroiEntity => {

            let poderHeroiResponseDto  = new PoderHeroiResponseDto();
            poderHeroiResponseDto.idPoder = poderHeroiEntity.idPoder;
            poderHeroiResponseDto.nomePoder = poderHeroiEntity.poder.nomePoder;
            arrayPoderesHeroiResponseDto.push( poderHeroiResponseDto );

        });
     

        return  arrayPoderesHeroiResponseDto;
    }

    /**
     * 
     * @param CadastroPoderRequestDto 
     * Vincula o poder ao herói, se:
     * 1. herói existe
     * 2. herói não possui esse poder já cadastrado
     * 3. poder existe
     */
    async cadastrarPoderHeroi( cadastroPoderRequestDto :CadastroPoderRequestDto ) {
        const heroiEncontrado = await this.superHeroiEntityRepository.findOne( { where: { id: cadastroPoderRequestDto.idHeroi } } );

        if( !heroiEncontrado ) {
            throw new BadRequestException(`Não há um herói com o id: ${cadastroPoderRequestDto.idHeroi} cadastrado no sistema!`);
        }

        const arrayPoderesCorrespondentes = heroiEncontrado.heroiPoderes.filter( heroiPoder => heroiPoder.idPoder === cadastroPoderRequestDto.idPoder );

        if( arrayPoderesCorrespondentes.length > 0 ) {
            throw new ConflictException(`Poder de id: ${cadastroPoderRequestDto.idPoder} já cadastrado para esse herói!`);
        }

        const poderEntity = await this.poderEntityRepository.findOne( { where: { id: cadastroPoderRequestDto.idPoder } } );

        if ( !poderEntity ) {
            throw new BadRequestException(`Poder de id: ${cadastroPoderRequestDto.idPoder} não encontrado no sistema.`);
        }

        const heroiPoderEntityNovo = new HeroiPoderEntity();
        heroiPoderEntityNovo.idPoder = cadastroPoderRequestDto.idPoder;
        heroiPoderEntityNovo.idHeroi = cadastroPoderRequestDto.idHeroi;

        this.heroiPoderEntityRepository.save( heroiPoderEntityNovo );

        this.logService.gravarLog( `Poder  ${heroiPoderEntityNovo.idPoder} adicionado ao herói  ${heroiPoderEntityNovo.idHeroi}`, LogEnum.INFO );
    }

    async deletarPoderHeroi( idPoder: bigint, idHeroi: bigint ) {

        const heroiEncontrado = await this.superHeroiEntityRepository.findOne( { where: { id: idHeroi } } );

        if( !heroiEncontrado ) {
            throw new BadRequestException(`Não há um herói com o id: ${idHeroi} cadastrado no sistema!`);
        }

        const result = await this.heroiPoderEntityRepository.delete( { 
            idPoder: idPoder,
            idHeroi: idHeroi
        } );

        if (!result.affected){
            throw new BadRequestException( `Não há um poder com o id: ${idPoder} para o herói de id: ${idHeroi} cadastrado no sistema!` )
        }

        this.logService.gravarLog( `Poder  ${idPoder} removido do herói  ${idHeroi}`, LogEnum.INFO );

    }
}
