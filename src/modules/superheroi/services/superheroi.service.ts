import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { CadastroSuperHeroiRequestDto } from '../dtos/cadastro.super.heroi.request.dto';
import { CadastroSuperHeroiResponseDto } from '../dtos/cadastro.super.heroi.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlinhamentoEntity } from 'src/database/entities/postgres/alinhamento.entity';
import { CorEntity } from 'src/database/entities/postgres/cor.entity';
import { EditoraEntity } from 'src/database/entities/postgres/editora.entity';
import { GeneroEntity } from 'src/database/entities/postgres/genero.entity';
import { RacaEntity } from 'src/database/entities/postgres/raca.entity';
import { SuperHeroiEntity } from 'src/database/entities/postgres/super.heroi.entity';
import { LogService } from 'src/common/log/log.service';
import { ParametrosCadastroResponseDto } from '../dtos/parametros.cadastro.response.dto';
import { SuperHeroiResponseDto } from '../dtos/super.heroi.response.dto';
import { AtualizarSuperHeroiRequestDto } from '../dtos/atualizar.super.heroi.request.dto';
import { AtributoSuperheroiDto, PoderSuperHeroiDto, SuperHeroiDetalhadoResponseDto } from '../dtos/super.heroi.detalhado.response.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { DEFAULT_PAGE_SIZE } from 'src/common/constants/common.constants';
import { HeroiAtributoEntity } from 'src/database/entities/postgres/heroi.atributo.entity';
import { AtributoEntity } from 'src/database/entities/postgres/atributo.entity';
import { PoderEntity } from 'src/database/entities/postgres/poder.entity';
import { BatalhaDto, ConfrontoDto, HeroiConfrontoDto } from '../dtos/confronto.dto';
import { ResultadoBatalhaConfrontoEnum } from '../models/enums/resultado.batalha-confronto.enum';
import { FiltroEPaginacaoDto } from '../dtos/paginacao.dto';
import {  FiltroConfrontoEditorasRequestDto } from '../dtos/filtro.confronto.editoras.dto';
import { ConfrontoEditoraResponseDto, ElementoEditoraDto } from '../dtos/confronto.editoras.response.dto';
import { ConfrontoDuasEditorasParametersDto } from '../dtos/confronto.duas.editoras.parameters.dto';
import { LogEnum } from 'src/common/log/models/enums/log.enum';

@Injectable()
export class SuperheroiService {

    constructor(
        @InjectRepository(AlinhamentoEntity, 'POSTGRES') private readonly alinhamentoEntityRepository : Repository<AlinhamentoEntity>,
        @InjectRepository(CorEntity, 'POSTGRES') private readonly corEntityRepository : Repository<CorEntity>,
        @InjectRepository(EditoraEntity, 'POSTGRES') private readonly editoraEntityRepository : Repository<EditoraEntity>,
        @InjectRepository(GeneroEntity, 'POSTGRES') private readonly generoEntityRepository : Repository<GeneroEntity>,
        @InjectRepository(RacaEntity, 'POSTGRES') private readonly racaEntityRepository : Repository<RacaEntity>,
        @InjectRepository(SuperHeroiEntity, 'POSTGRES') private readonly superHeroiEntityRepository : Repository<SuperHeroiEntity>,
        @InjectRepository(AtributoEntity, 'POSTGRES') private readonly atributoEntityRepository : Repository<AtributoEntity>,
        @InjectRepository(PoderEntity, 'POSTGRES') private readonly poderEntityRepository : Repository<PoderEntity>,
        private readonly logService: LogService
    ) {  }

    /**
     * Pega todos os parâmetros que serão necessários para o cadastro do heroi
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

    /**
     * Lista todos os super heróis obtidos na tabela superhero de forma detalhada
     * Traz atributos, poderes, com nomes, dentre outros.
     * @returns Promise<SuperHeroiDetalhadoResponseDto[]>
     */
    async listarTodosSuperHeroisDetalhado( paginacaoDto: FiltroEPaginacaoDto ): Promise<SuperHeroiDetalhadoResponseDto[]> {

        let usarPaginacao: boolean = true;
        
        const superHeroiEntities: SuperHeroiEntity[] = await this.consultaSuperHeroisDetalhado( paginacaoDto, usarPaginacao );            

        const arraySuperHeroiDetalhadoResponseDto: SuperHeroiDetalhadoResponseDto[] = [];

        superHeroiEntities.forEach( superHeroiEntity => {
            let superHeroiDetalhadoResponseDto = new SuperHeroiDetalhadoResponseDto();
            this.alimentarSuperHeroiDetalhadoResponseDto( superHeroiDetalhadoResponseDto, superHeroiEntity );
            arraySuperHeroiDetalhadoResponseDto.push( superHeroiDetalhadoResponseDto );
        });
        return arraySuperHeroiDetalhadoResponseDto;
        
    }

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
            
            this.logService.gravarLog( `Super herói ${id} criado`, LogEnum.INFO );

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
            this.logService.gravarLog( `Super herói ${id} atualizado`, LogEnum.INFO );        
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

        this.logService.gravarLog( `Super herói ${id} deletado`, LogEnum.INFO );

    }

    /**
     * 
     * @param paginacaoDto 
     * Para todas as combinações de heróis resultado dos filtros passados,
     * serão simulados confrontos com base em seus atributos.
     * Cada confronto, terá várias batalhas, com seus respectivos vencedores
     * 
     * @returns Promise<ConfrontoDto[]>
     */
    async confrontosSuperHerois( paginacaoDto: FiltroEPaginacaoDto ): Promise<ConfrontoDto[]> {

        let usarPaginacao: boolean = true;
        
        const superHeroisEntity: SuperHeroiEntity[] = await this.consultaSuperHeroisDetalhado( paginacaoDto, usarPaginacao );

        const confrontos: ConfrontoDto[] = await this.calcularConfrontosEntreDoisGruposSuperHerois( superHeroisEntity, superHeroisEntity );

        return confrontos;

    }

    /**
     * 
     * @param FiltroConfrontoEditorasDto 
     * 
     * É calculado todos os confrontos entre todas as editoras
     * 
     * @returns Promise<ConfrontoEditoraResponseDto[]>
     */
    async confrontoTodasEditoras( filtroConfrontoEditorasDto: FiltroConfrontoEditorasRequestDto ): Promise<ConfrontoEditoraResponseDto[]> {

            const editoras = await this.editoraEntityRepository.find();

            const confrontosEditoras : ConfrontoEditoraResponseDto[] = [];

            let editora1 = editoras[filtroConfrontoEditorasDto.numeroPagina - 1]
            let paginacaoDto = new FiltroEPaginacaoDto();
            paginacaoDto.editoraId = Number(editora1.id);
            const superHeroisEntityEditora1: SuperHeroiEntity[] = await this.consultaSuperHeroisDetalhado( paginacaoDto, false );
            for( const [i, value2] of editoras.entries() ) {
                let editora2 = value2;

                let confrontoEditoraResponseDto = new ConfrontoEditoraResponseDto();

                let editora1Dto = new ElementoEditoraDto();
                editora1Dto.id = editora1.id;
                editora1Dto.nome = editora1.editora;

                let editora2Dto = new ElementoEditoraDto();
                editora2Dto.id = editora2.id;
                editora2Dto.nome = editora2.editora;             

                if( editora2.id != editora1.id ) {
                    paginacaoDto.editoraId = Number(editora2.id);
                    const superHeroisEntityEditora2: SuperHeroiEntity[] = await this.consultaSuperHeroisDetalhado( paginacaoDto, false );
                    const confrontos: ConfrontoDto[] = await this.calcularConfrontosEntreDoisGruposSuperHerois( superHeroisEntityEditora1, superHeroisEntityEditora2 );
                    let contagemVitoriasEditora1 = 0;
                    let contagemVitoriasEditora2 = 0;
                    confrontos.forEach( confronto => {
                        if( confronto.resultadoConfronto === ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1 ) {
                            contagemVitoriasEditora1 += 1;
                        } else if ( confronto.resultadoConfronto === ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2 ) {
                            contagemVitoriasEditora2 += 1;
                        }
                    });
                    if( contagemVitoriasEditora1 > contagemVitoriasEditora2 ) {
                        confrontoEditoraResponseDto.resultado = 'VITORIA_EDITORA_1';
                    } else if ( contagemVitoriasEditora2 > contagemVitoriasEditora1 ) {
                        confrontoEditoraResponseDto.resultado = 'VITORIA_EDITORA_2';
                    } else {
                        confrontoEditoraResponseDto.resultado = 'EMPATE';
                    }
                    editora1Dto.confrontosVencidos = contagemVitoriasEditora1;
                    editora2Dto.confrontosVencidos = contagemVitoriasEditora2;
                }               

                confrontoEditoraResponseDto.editora1 = editora1Dto;
                confrontoEditoraResponseDto.editora2= editora2Dto;

                confrontosEditoras.push(confrontoEditoraResponseDto);
            };
            
            

            return confrontosEditoras;

    }

    /**
     * 
     * @param ConfrontoDuasEditorasParametersDto 
     * 
     * É calculado todos os confrontos entre duas as editoras
     * 
     * @returns Promise<ConfrontoEditoraResponseDto[]>
     */
    async confrontoDuasEditoras( confrontoDuasEditorasParametersDto: ConfrontoDuasEditorasParametersDto ): Promise<ConfrontoEditoraResponseDto[]> {

        const editora1 = await this.editoraEntityRepository.findOne( { where: { id: BigInt(confrontoDuasEditorasParametersDto.idEditora1) } });

        const editora2 = await this.editoraEntityRepository.findOne( { where: { id: BigInt(confrontoDuasEditorasParametersDto.idEditora2) } });

        if( !editora1 ) {
            throw new BadRequestException(` A editora de id: ${confrontoDuasEditorasParametersDto.idEditora1} não existe! `)
        }
        if( !editora2 ) {
            throw new BadRequestException(` A editora de id: ${confrontoDuasEditorasParametersDto.idEditora2} não existe! `)
        }

        const confrontosEditoras : ConfrontoEditoraResponseDto[] = [];
        
        let paginacaoDto = new FiltroEPaginacaoDto();
        paginacaoDto.editoraId = Number(confrontoDuasEditorasParametersDto.idEditora1);
        const superHeroisEntityEditora1: SuperHeroiEntity[] = await this.consultaSuperHeroisDetalhado( paginacaoDto, false );

        paginacaoDto.editoraId = Number(confrontoDuasEditorasParametersDto.idEditora2);
        const superHeroisEntityEditora2: SuperHeroiEntity[] = await this.consultaSuperHeroisDetalhado( paginacaoDto, false );

        let confrontoEditoraResponseDto = new ConfrontoEditoraResponseDto();

        let editora1Dto = new ElementoEditoraDto();
        editora1Dto.id = editora1.id;
        editora1Dto.nome = editora1.editora;

        let editora2Dto = new ElementoEditoraDto();
        editora2Dto.id = editora2.id;
        editora2Dto.nome = editora2.editora;
       
        const confrontos: ConfrontoDto[] = await this.calcularConfrontosEntreDoisGruposSuperHerois( superHeroisEntityEditora1, superHeroisEntityEditora2 );
        let contagemVitoriasEditora1 = 0;
        let contagemVitoriasEditora2 = 0;
        confrontos.forEach( confronto => {
            if( confronto.resultadoConfronto === ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1 ) {
                contagemVitoriasEditora1 += 1;
            } else if ( confronto.resultadoConfronto === ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2 ) {
                contagemVitoriasEditora2 += 1;
            }
        });
        if( contagemVitoriasEditora1 > contagemVitoriasEditora2 ) {
            confrontoEditoraResponseDto.resultado = 'VITORIA_EDITORA_1';
        } else if ( contagemVitoriasEditora2 > contagemVitoriasEditora1 ) {
            confrontoEditoraResponseDto.resultado = 'VITORIA_EDITORA_2';
            } else {
            confrontoEditoraResponseDto.resultado = 'EMPATE';
        }
        editora1Dto.confrontosVencidos = contagemVitoriasEditora1;
        editora2Dto.confrontosVencidos = contagemVitoriasEditora2;
                      
        confrontoEditoraResponseDto.editora1 = editora1Dto;
        confrontoEditoraResponseDto.editora2= editora2Dto;
        confrontosEditoras.push(confrontoEditoraResponseDto);

        return confrontosEditoras;

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

    alimentarSuperHeroiDetalhadoResponseDto( superHeroiDetalhadoResponseDto: SuperHeroiDetalhadoResponseDto, superHeroiEntity: SuperHeroiEntity ) {

        superHeroiDetalhadoResponseDto.idSuperHeroi = superHeroiEntity.id;
        superHeroiDetalhadoResponseDto.alinhamento = { nome: superHeroiEntity.alinhamento?.alignment , id:  superHeroiEntity.alinhamento?.id  };
        superHeroiDetalhadoResponseDto.altura = superHeroiEntity.altura;
        superHeroiDetalhadoResponseDto.corDaPele = { nome:superHeroiEntity.corDaPele?.cor ,  id: superHeroiEntity.corDaPele?.id };
        superHeroiDetalhadoResponseDto.corDoCabelo = { nome:superHeroiEntity.corDoCabelo?.cor ,  id: superHeroiEntity.corDoCabelo?.id};
        superHeroiDetalhadoResponseDto.corDoOlho = { nome: superHeroiEntity.corDoOlho?.cor, id: superHeroiEntity.corDoOlho?.id };
        superHeroiDetalhadoResponseDto.editora = { nome: superHeroiEntity.editora?.editora, id: superHeroiEntity.editora?.id};
        superHeroiDetalhadoResponseDto.genero = { nome:superHeroiEntity.genero?.genero , id: superHeroiEntity.genero?.id };
        superHeroiDetalhadoResponseDto.nomeCompleto = superHeroiEntity.nomeCompleto;
        superHeroiDetalhadoResponseDto.nomeSuperHeroi = superHeroiEntity.nomeSuperHeroi;
        superHeroiDetalhadoResponseDto.peso = superHeroiEntity.peso;
        superHeroiDetalhadoResponseDto.raca = { nome: superHeroiEntity.raca?.raca, id: superHeroiEntity.raca?.id };

        const heroiPoderes = superHeroiEntity.heroiPoderes;
        heroiPoderes.forEach( heroiPoder => {
            let poderSuperHeroiDto = new PoderSuperHeroiDto();
            poderSuperHeroiDto.idPoder = heroiPoder.idPoder;
            poderSuperHeroiDto.nomePoder = heroiPoder.poder.nomePoder;
            superHeroiDetalhadoResponseDto.poderes.push( poderSuperHeroiDto );
        });

        const heroiAtributos = superHeroiEntity.heroiAtributos;
        heroiAtributos.forEach( heroiAtributo => {
            let atributoSuperHeroiDto = new AtributoSuperheroiDto();
            atributoSuperHeroiDto.idAtributo = heroiAtributo.idAtributo;
            atributoSuperHeroiDto.nomeAtributo = heroiAtributo.atributo.nomeAtributo;
            atributoSuperHeroiDto.valorAtributo = heroiAtributo.valorAtributo;
            superHeroiDetalhadoResponseDto.atributos.push( atributoSuperHeroiDto );
        });

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

    /**
     * 
     * @param paginacaoDto 
     * Query que pega todos os super herois utilizando paginação, nas seguintes condições:
     * 1. 10 registros por página
     * @returns 
     */
    private async consultaSuperHeroisDetalhado( paginacaoDto: FiltroEPaginacaoDto, usarPaginacao: boolean): Promise<SuperHeroiEntity[]> {
        const query = this.superHeroiEntityRepository.createQueryBuilder('superheroi')
                        .leftJoinAndSelect('superheroi.heroiAtributos', 'heroiAtributos')
                        .leftJoinAndSelect('superheroi.heroiPoderes', 'heroiPoderes')
                        .leftJoinAndSelect('superheroi.genero', 'genero')
                        .leftJoinAndSelect('superheroi.corDoOlho', 'corDoOlho')
                        .leftJoinAndSelect('superheroi.corDoCabelo', 'corDoCabelo')
                        .leftJoinAndSelect('superheroi.corDaPele', 'corDaPele')
                        .leftJoinAndSelect('superheroi.raca', 'raca')
                        .leftJoinAndSelect('superheroi.editora', 'editora')
                        .leftJoinAndSelect('superheroi.alinhamento', 'alinhamento')
                        .leftJoinAndSelect('heroiAtributos.atributo', 'atributo')
                        .leftJoinAndSelect('heroiPoderes.poder', 'poder')
                        .where( '1 = 1');
                        
        if ( paginacaoDto.alinhamentoId ) {
            query.where("alinhamento.id = :id", { id: paginacaoDto.alinhamentoId });
        }
        if ( paginacaoDto.atributoId ) {
            query.where("heroiAtributos.idAtributo = :id", { id: paginacaoDto.atributoId });
        }
        if ( paginacaoDto.editoraId ) {
            query.where("editora.id = :id", { id: paginacaoDto.editoraId });
        }
        if ( paginacaoDto.poderId ) {
            query.where("heroiPoderes.idPoder = :id", { id: paginacaoDto.poderId });
        }

        if( paginacaoDto.orderByAtributoAsc && !paginacaoDto.orderByAtributoDesc ) {
            query.orderBy('heroiAtributos.idAtributo', 'ASC');
        }   else if (  paginacaoDto.orderByAtributoDesc && !paginacaoDto.orderByAtributoAsc ) {
            query.orderBy('heroiAtributos.idAtributo', 'DESC');
        }
        
        if ( paginacaoDto.orderByPoderAsc  && !paginacaoDto.orderByPoderDesc) {
            query.orderBy('heroiPoderes.idPoder', 'ASC');
        }else if ( paginacaoDto.orderByPoderDesc && !paginacaoDto.orderByPoderAsc ) {
            query.orderBy('heroiPoderes.idPoder', 'DESC');
        }

        if( usarPaginacao ) {
            query.take( DEFAULT_PAGE_SIZE.SUPERHEROI );

        if( paginacaoDto.numeroPagina ) {
            query.skip( DEFAULT_PAGE_SIZE.SUPERHEROI *  (paginacaoDto.numeroPagina - 1));
        } else {
            query.skip(0);
        }
        }
        

        query.orderBy('superheroi.id', 'ASC');

        return await query.getMany(); ;
    }

    private async calcularConfrontosEntreDoisGruposSuperHerois( grupoHeroisLado1: SuperHeroiEntity[], grupoHeroisLado2: SuperHeroiEntity[] ): Promise<ConfrontoDto[]> {
        const atributos: AtributoEntity[] = await this.atributoEntityRepository.find();
        const confrontos: ConfrontoDto[] = [];
        grupoHeroisLado1.forEach( (value1, index1) => {
            let superHeroi1 = value1;
            
            grupoHeroisLado2.forEach( (value2, index2 ) => {
                if(  index1 != index2 ) {
                    
                    let superHeroi2 = value2;

                    let confrontoDto = new ConfrontoDto();

                    let heroi1Dto = new HeroiConfrontoDto();
                    heroi1Dto.id = superHeroi1.id;
                    heroi1Dto.nome = superHeroi1.nomeSuperHeroi;
                    let heroi2Dto = new HeroiConfrontoDto();
                    heroi2Dto.id = superHeroi2.id;
                    heroi2Dto.nome = superHeroi2.nomeSuperHeroi;

                    confrontoDto.heroi1 = heroi1Dto;
                    confrontoDto.heroi2 = heroi2Dto;

                    atributos.forEach( atributo => {
                        let batalhaDto = new BatalhaDto();
                        batalhaDto.nomeAtributo = atributo.nomeAtributo;
                        let atributosHeroi1 = superHeroi1.heroiAtributos.filter( heroiAtributo => heroiAtributo.idAtributo === atributo.id );
                        let atributosHeroi2 = superHeroi2.heroiAtributos.filter( heroiAtributo => heroiAtributo.idAtributo === atributo.id );
                        
                        batalhaDto.valorAtributoHeroi1 = atributosHeroi1.length > 0 ? atributosHeroi1[0].valorAtributo : 0;
                        batalhaDto.valorAtributoHeroi2 = atributosHeroi2.length > 0 ? atributosHeroi2[0].valorAtributo : 0;

                        confrontoDto.heroi1 = heroi1Dto;
                        confrontoDto.heroi2 = heroi2Dto;

                        if( atributosHeroi1.length === 0 ) {
                            if( atributosHeroi2.length === 0 ) {
                                batalhaDto.resultadoBatalha = ResultadoBatalhaConfrontoEnum.EMPATE;
                            } else {
                                batalhaDto.resultadoBatalha = ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2;
                            }
                        } else {
                            if( atributosHeroi2.length === 0 ) {
                                batalhaDto.resultadoBatalha = ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1;
                            } else {
                                if ( atributosHeroi1[0].valorAtributo > atributosHeroi2[0].valorAtributo ) {
                                    batalhaDto.resultadoBatalha = ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1;
                                } else if ( atributosHeroi1[0].valorAtributo === atributosHeroi2[0].valorAtributo ) {
                                    batalhaDto.resultadoBatalha = ResultadoBatalhaConfrontoEnum.EMPATE;
                                } else {
                                    batalhaDto.resultadoBatalha = ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2;
                                }
                            }
                        }

                        confrontoDto.batalhas.push( batalhaDto );
                    });
                    let contagemVitoriasHeroi1 = 0;
                    let contagemVitoriasHeroi2 = 0;
                    confrontoDto.batalhas.forEach( batalha => {
                        if( batalha.resultadoBatalha === ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1 ) {
                            contagemVitoriasHeroi1 += 1;
                        } else if ( batalha.resultadoBatalha === ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2 ) {
                            contagemVitoriasHeroi2 += 1;
                        }
                    }); 

                    if( contagemVitoriasHeroi1 > contagemVitoriasHeroi2 ) {
                        confrontoDto.resultadoConfronto = ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1;
                    } else if ( contagemVitoriasHeroi2 > contagemVitoriasHeroi1 ) {
                        confrontoDto.resultadoConfronto = ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2;
                    } else {
                        confrontoDto.resultadoConfronto = ResultadoBatalhaConfrontoEnum.EMPATE;
                    }

                    confrontos.push( confrontoDto );
                }              
            } );
            
        } );

        return confrontos;

    }

}
