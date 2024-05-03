import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { CadastroSuperHeroiRequestDto } from '../dtos/cadastro.super.heroi.request.dto';
import { CadastroSuperHeroiResponseDto } from '../dtos/cadastro.super.heroi.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlinhamentoEntity } from 'src/database/entities/postgres/alinhamento.entity';
import { AtributoEntity } from 'src/database/entities/postgres/atributo.entity';
import { CorEntity } from 'src/database/entities/postgres/cor.entity';
import { EditoraEntity } from 'src/database/entities/postgres/editora.entity';
import { GeneroEntity } from 'src/database/entities/postgres/genero.entity';
import { HeroiAtributoEntity } from 'src/database/entities/postgres/heroi.atributo.entity';
import { PoderEntity } from 'src/database/entities/postgres/poder.entity';
import { RacaEntity } from 'src/database/entities/postgres/raca.entity';
import { SuperHeroiEntity } from 'src/database/entities/postgres/super.heroi.entity';
import { LogService } from 'src/common/log/log.service';
import { ParametrosCadastroResponseDto } from '../dtos/parametros.cadastro.response.dto';
import { SuperHeroiResponseDto } from '../dtos/super.heroi.response.dto';
import { AtualizarSuperHeroiRequestDto } from '../dtos/atualizar.super.heroi.request.dto';
import { AtualizarUsuarioRequestDto } from 'src/modules/usuario/dtos/atualizar.usuario.request.dto';

@Injectable()
export class SuperheroiService {

    constructor(
        @InjectRepository(AlinhamentoEntity, 'POSTGRES') private readonly alinhamentoEntityRepository : Repository<AlinhamentoEntity>,
        @InjectRepository(AtributoEntity, 'POSTGRES') private readonly atributoEntityRepository : Repository<AtributoEntity>,
        @InjectRepository(CorEntity, 'POSTGRES') private readonly corEntityRepository : Repository<CorEntity>,
        @InjectRepository(EditoraEntity, 'POSTGRES') private readonly editoraEntityRepository : Repository<EditoraEntity>,
        @InjectRepository(GeneroEntity, 'POSTGRES') private readonly generoEntityRepository : Repository<GeneroEntity>,
        @InjectRepository(HeroiAtributoEntity, 'POSTGRES') private readonly heroiAtributoEntityRepository : Repository<HeroiAtributoEntity>,
        @InjectRepository(PoderEntity, 'POSTGRES') private readonly poderEntityRepository : Repository<PoderEntity>,
        @InjectRepository(RacaEntity, 'POSTGRES') private readonly racaEntityRepository : Repository<RacaEntity>,
        @InjectRepository(SuperHeroiEntity, 'POSTGRES') private readonly superHeroiEntityRepository : Repository<SuperHeroiEntity>,
        private readonly logService: LogService
    ) {  }
/**
 * 
 * @param cadastroSuperHeroiRequestDto nomeSuperHeroi: string;
 * Cria um herói se:
 * 1. Os parâmetros passados são válidos
 * 2. Não existe um herói com essa configuração
 */
    async cadastrarSuperHeroi( cadastroSuperHeroiRequestDto: CadastroSuperHeroiRequestDto ) {

        const generoEntity: GeneroEntity = await this.generoEntityRepository.findOne( { where: { id: cadastroSuperHeroiRequestDto.generoId } } );
        const corDoOlhoEntity: CorEntity = await this.corEntityRepository.findOne( { where: { id: cadastroSuperHeroiRequestDto.corDoOlhoId } } );
        const corDoCabeloEntity: CorEntity = await this.corEntityRepository.findOne( { where: { id: cadastroSuperHeroiRequestDto.corDoCabeloId } } );
        const corDaPeleEntity: CorEntity = await this.corEntityRepository.findOne( { where: { id: cadastroSuperHeroiRequestDto.corDaPeleId } } );
        const racaEntity: RacaEntity = await this.racaEntityRepository.findOne( { where: { id: cadastroSuperHeroiRequestDto.racaId } } );
        const editoraEntity: EditoraEntity = await this.editoraEntityRepository.findOne( { where: { id: cadastroSuperHeroiRequestDto.editoraId } } );
        const alinhamentoEntity: AlinhamentoEntity = await this.alinhamentoEntityRepository.findOne( { where: { id: cadastroSuperHeroiRequestDto.alinhamentoId } } );
        
        this.validarEntradaIdEntidades( generoEntity, corDoOlhoEntity, corDoCabeloEntity, 
            corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity );

        const superHeroiEntity = new SuperHeroiEntity();

        this.alimentarEntidadeSuperHeroi( superHeroiEntity, generoEntity, corDoOlhoEntity, corDoCabeloEntity, 
            corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity,cadastroSuperHeroiRequestDto.nomeCompleto, 
            cadastroSuperHeroiRequestDto.altura, cadastroSuperHeroiRequestDto.peso, cadastroSuperHeroiRequestDto.nomeSuperHeroi );

        const heroiExiste: boolean = await this.verificarHeroiJaExiste (  generoEntity, corDoOlhoEntity, corDoCabeloEntity, 
                corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity,cadastroSuperHeroiRequestDto.nomeCompleto, 
                cadastroSuperHeroiRequestDto.altura, cadastroSuperHeroiRequestDto.peso, cadastroSuperHeroiRequestDto.nomeSuperHeroi );
        
        if( !heroiExiste ) {
            const { id, nomeSuperHeroi, nomeCompleto } = await this.superHeroiEntityRepository.save( superHeroiEntity );
            const cadastroSuperHeroiResponseDto = new CadastroSuperHeroiResponseDto();
            this.alimentarCadastroSuperHeroiResponseDto( cadastroSuperHeroiResponseDto, id, nomeSuperHeroi, nomeCompleto );            

            return cadastroSuperHeroiResponseDto;               
        } else {
            throw new ConflictException(`Herói com essas configurações já cadastrado`);
        }      

    }

    /**
     * @param id 
     * @param atualizarSuperHeroiRequestDto 
     * Atualiza super herói pelo id passado se:
     * 1. Os parâmetros passados são válidos
     * 2. Não existe um herói com essa configuração
     */
    async atualizarSuperHeroi( id: bigint, atualizarSuperHeroiRequestDto: AtualizarSuperHeroiRequestDto ) {

        const superHeroiEncontrado = await this.superHeroiEntityRepository.findOne({ where: { id } });

        if ( !superHeroiEncontrado ) {
            throw new BadRequestException(`Não há um super herói com o id: ${id} cadastrado no sistema!`);
        }

        const generoEntity: GeneroEntity = await this.generoEntityRepository.findOne( { where: { id: atualizarSuperHeroiRequestDto.generoId } } );
        const corDoOlhoEntity: CorEntity = await this.corEntityRepository.findOne( { where: { id: atualizarSuperHeroiRequestDto.corDoOlhoId } } );
        const corDoCabeloEntity: CorEntity = await this.corEntityRepository.findOne( { where: { id: atualizarSuperHeroiRequestDto.corDoCabeloId } } );
        const corDaPeleEntity: CorEntity = await this.corEntityRepository.findOne( { where: { id: atualizarSuperHeroiRequestDto.corDaPeleId } } );
        const racaEntity: RacaEntity = await this.racaEntityRepository.findOne( { where: { id: atualizarSuperHeroiRequestDto.racaId } } );
        const editoraEntity: EditoraEntity = await this.editoraEntityRepository.findOne( { where: { id: atualizarSuperHeroiRequestDto.editoraId } } );
        const alinhamentoEntity: AlinhamentoEntity = await this.alinhamentoEntityRepository.findOne( { where: { id: atualizarSuperHeroiRequestDto.alinhamentoId } } );

        this.validarEntradaIdEntidades( generoEntity, corDoOlhoEntity, corDoCabeloEntity, 
            corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity );

        const heroiExiste: boolean = await this.verificarHeroiJaExiste (  generoEntity, corDoOlhoEntity, corDoCabeloEntity, 
                corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity,atualizarSuperHeroiRequestDto.nomeCompleto, 
                atualizarSuperHeroiRequestDto.altura, atualizarSuperHeroiRequestDto.peso, atualizarSuperHeroiRequestDto.nomeSuperHeroi );
        
        if( !heroiExiste ) {
            await this.superHeroiEntityRepository.update( { id: id } , this.alimentarSuperHeroiEntidade( atualizarSuperHeroiRequestDto, generoEntity, corDoOlhoEntity, 
                corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity ));           
        } else {
            throw new ConflictException(`Herói com essas configurações já cadastrado`);
        } 
         
    }

    /**
     * 
     * @param id 
     * Remove um super heroi pelo id, se existir
     */
    async deletarSuperHeroi( id: bigint) {
        
        const result = await this.superHeroiEntityRepository.delete( { id: id } );

        if (!result.affected){
            throw new BadRequestException( `Não há um super herói com o id: ${id} cadastrado no sistema!` )
        }

    }
    
    /**
     * Pega todos os parâmetros que serão necessários para o cadastro do usuário
     * @returns Promise<ParametrosCadastroResponseDto>
     */
    async pegarParametrosCadastro( ) : Promise<ParametrosCadastroResponseDto> {

        const parametrosCadastroResponseDto = new ParametrosCadastroResponseDto();
        parametrosCadastroResponseDto.nomeCompleto = 'livre';
        parametrosCadastroResponseDto.nomeSuperHeroi = 'livre';
        parametrosCadastroResponseDto.peso = 'livre';
        parametrosCadastroResponseDto.altura = 'livre';

        const generoEntitys = await this.generoEntityRepository.find( );
        const coresEntitys = await this.corEntityRepository.find();
        const racaEntitys = await this.racaEntityRepository.find();
        const editoraEntitys = await this.editoraEntityRepository.find();
        const alinhamentoEntitys = await this.alinhamentoEntityRepository.find();

        generoEntitys.forEach( genero => {
            parametrosCadastroResponseDto.genero.push( { nome: genero.genero, id: genero.id } );
        } );
        coresEntitys.forEach( cor => {
            parametrosCadastroResponseDto.corDaPele.push( { nome: cor.cor, id: cor.id } );
        } );
        coresEntitys.forEach( cor => {
            parametrosCadastroResponseDto.corDoCabelo.push( { nome: cor.cor, id: cor.id } );
        } );
        coresEntitys.forEach( cor => {
            parametrosCadastroResponseDto.corDoOlho.push( { nome: cor.cor, id: cor.id } );
        } );
        racaEntitys.forEach( raca => {
            parametrosCadastroResponseDto.raca.push( { nome: raca.raca, id: raca.id } );
        } );
        editoraEntitys.forEach( editora => {
            parametrosCadastroResponseDto.editora.push( { nome: editora.editora, id: editora.id } );
        } );
        alinhamentoEntitys.forEach( alinhamento => {
            parametrosCadastroResponseDto.alinhamento.push( { nome: alinhamento.alignment, id: alinhamento.id } );
        } );

        return parametrosCadastroResponseDto;



    }

    /**
     * Lista todos os super heróis obtidos na tabela superhero
     * @returns Promise<SuperHeroiResponseDto[]>
     */
    async listarTodosSuperHerois(  ): Promise<SuperHeroiResponseDto[]> {

        const superHeroiEntities = await this.superHeroiEntityRepository.find();

        const arraySuperHeroiResponseDto: SuperHeroiResponseDto[] = [];

        superHeroiEntities.forEach( superHeroiEntity => {
            let superHeroiResponseDto = new SuperHeroiResponseDto();
            this.alimentarSuperHeroiResponseDto( superHeroiResponseDto, superHeroiEntity );
            arraySuperHeroiResponseDto.push( superHeroiResponseDto );
        });

        return arraySuperHeroiResponseDto;
        
    }

    validarEntradaIdEntidades( generoEntity: GeneroEntity, corDoOlhoEntity: CorEntity, corDoCabeloEntity: CorEntity, 
        corDaPeleEntity: CorEntity, racaEntity: RacaEntity, editoraEntity: EditoraEntity, alinhamentoEntity: AlinhamentoEntity ) {

            if ( !generoEntity ) {
                throw new BadRequestException(`Esse valor para o campo generoId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
            }
            if ( !corDoOlhoEntity ) {
                throw new BadRequestException(`Esse valor para o campo corDoOlhoId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
            }
            if ( !corDoCabeloEntity ) {
                throw new BadRequestException(`Esse valor para o campo corDoCabeloId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
            }
            if ( !corDaPeleEntity ) {
                throw new BadRequestException(`Esse valor para o campo corDaPeleId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
            }
            if ( !racaEntity ) {
                throw new BadRequestException(`Esse valor para o campo racaId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
            }
            if ( !editoraEntity ) {
                throw new BadRequestException(`Esse valor para o campo editoraId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
            }
            if ( !alinhamentoEntity ) {
                throw new BadRequestException(`Esse valor para o campo alinhamentoId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
            }
    }

    alimentarEntidadeSuperHeroi( superHeroiEntity: SuperHeroiEntity, generoEntity: GeneroEntity, corDoOlhoEntity: CorEntity, corDoCabeloEntity: CorEntity, 
        corDaPeleEntity: CorEntity, racaEntity: RacaEntity, editoraEntity: EditoraEntity, alinhamentoEntity: AlinhamentoEntity, 
        nomeCompleto: string, altura: number, peso: number, nomeSuperHeroi: string ) {
            superHeroiEntity.genero = generoEntity;
            superHeroiEntity.corDoOlho = corDoOlhoEntity;
            superHeroiEntity.corDoCabelo = corDoCabeloEntity;
            superHeroiEntity.corDaPele = corDaPeleEntity;
            superHeroiEntity.raca = racaEntity;
            superHeroiEntity.editora = editoraEntity;
            superHeroiEntity.alinhamento = alinhamentoEntity;
            superHeroiEntity.nomeCompleto = nomeCompleto;
            superHeroiEntity.altura = altura;
            superHeroiEntity.peso = peso;
            superHeroiEntity.nomeSuperHeroi = nomeSuperHeroi;
    }

    alimentarCadastroSuperHeroiResponseDto( cadastroSuperHeroiResponseDto: CadastroSuperHeroiResponseDto, 
        id: bigint, nomeSuperHeroi:string, nomeCompleto:string ) {
            cadastroSuperHeroiResponseDto.id = id;
            cadastroSuperHeroiResponseDto.nomeSuperHeroi = nomeSuperHeroi;
            cadastroSuperHeroiResponseDto.nomeCompleto = nomeCompleto;
    }

    alimentarSuperHeroiResponseDto( superHeroiResponseDto: SuperHeroiResponseDto, superHeroiEntity: SuperHeroiEntity ) {

        superHeroiResponseDto.idSuperHeroi = superHeroiEntity.id;
        superHeroiResponseDto.alinhamento = { nome: superHeroiEntity.alinhamento?.alignment , id:  superHeroiEntity.alinhamento?.id  };
        superHeroiResponseDto.altura = superHeroiEntity.altura;
        superHeroiResponseDto.corDaPele = { nome:superHeroiEntity.corDaPele?.cor ,  id: superHeroiEntity.corDaPele?.id };
        superHeroiResponseDto.corDoCabelo = { nome:superHeroiEntity.corDoCabelo?.cor ,  id: superHeroiEntity.corDoCabelo?.id};
        superHeroiResponseDto.corDoOlho = { nome: superHeroiEntity.corDoOlho?.cor, id: superHeroiEntity.corDoOlho?.id };
        superHeroiResponseDto.editora = { nome: superHeroiEntity.editora?.editora, id: superHeroiEntity.editora?.id};
        superHeroiResponseDto.genero = { nome:superHeroiEntity.genero?.genero , id: superHeroiEntity.genero?.id };
        superHeroiResponseDto.nomeCompleto = superHeroiEntity.nomeCompleto;
        superHeroiResponseDto.nomeSuperHeroi = superHeroiEntity.nomeSuperHeroi;
        superHeroiResponseDto.peso = superHeroiEntity.peso;
        superHeroiResponseDto.raca = { nome: superHeroiEntity.raca?.raca, id: superHeroiEntity.raca?.id };

    }

    async verificarHeroiJaExiste( generoEntity: GeneroEntity, corDoOlhoEntity: CorEntity, corDoCabeloEntity: CorEntity, 
        corDaPeleEntity: CorEntity, racaEntity: RacaEntity, editoraEntity: EditoraEntity, alinhamentoEntity: AlinhamentoEntity, 
        nomeCompleto: string, altura: number, peso: number, nomeSuperHeroi: string ) : Promise<boolean> {
            const heroiEntity = await this.superHeroiEntityRepository.findOne( { where: {
                genero: generoEntity,
                corDoOlho : corDoOlhoEntity,
                corDoCabelo : corDoCabeloEntity,
                corDaPele : corDaPeleEntity,
                raca : racaEntity,
                editora : editoraEntity,
                alinhamento : alinhamentoEntity,
                nomeCompleto : nomeCompleto,
                altura : altura,
                peso : peso,
                nomeSuperHeroi: nomeSuperHeroi
            } } );

            if( heroiEntity ) {
                return true;
            }

            return false;
        }

        private alimentarSuperHeroiEntidade( atualizarSuperHeroiRequestDto: AtualizarSuperHeroiRequestDto, generoEntity: GeneroEntity, corDoOlhoEntity: CorEntity, corDoCabeloEntity: CorEntity, 
            corDaPeleEntity: CorEntity, racaEntity: RacaEntity, editoraEntity: EditoraEntity, alinhamentoEntity: AlinhamentoEntity ): Partial<SuperHeroiEntity>{
            return {
                    nomeSuperHeroi: atualizarSuperHeroiRequestDto.nomeSuperHeroi,
                    nomeCompleto: atualizarSuperHeroiRequestDto.nomeCompleto,
                    genero: generoEntity,
                    corDoOlho: corDoOlhoEntity,
                    corDoCabelo: corDoCabeloEntity,
                    corDaPele: corDaPeleEntity,
                    raca: racaEntity,
                    editora: editoraEntity,
                    alinhamento: alinhamentoEntity,
                    altura: atualizarSuperHeroiRequestDto.altura,
                    peso: atualizarSuperHeroiRequestDto.peso
            }
        }
}
