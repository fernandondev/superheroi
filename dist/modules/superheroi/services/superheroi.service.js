"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperheroiService = void 0;
const common_1 = require("@nestjs/common");
const cadastro_super_heroi_response_dto_1 = require("../dtos/cadastro.super.heroi.response.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alinhamento_entity_1 = require("../../../database/entities/postgres/alinhamento.entity");
const cor_entity_1 = require("../../../database/entities/postgres/cor.entity");
const editora_entity_1 = require("../../../database/entities/postgres/editora.entity");
const genero_entity_1 = require("../../../database/entities/postgres/genero.entity");
const raca_entity_1 = require("../../../database/entities/postgres/raca.entity");
const super_heroi_entity_1 = require("../../../database/entities/postgres/super.heroi.entity");
const log_service_1 = require("../../../common/log/log.service");
const parametros_cadastro_response_dto_1 = require("../dtos/parametros.cadastro.response.dto");
const super_heroi_response_dto_1 = require("../dtos/super.heroi.response.dto");
const super_heroi_detalhado_response_dto_1 = require("../dtos/super.heroi.detalhado.response.dto");
const common_constants_1 = require("../../../common/constants/common.constants");
const atributo_entity_1 = require("../../../database/entities/postgres/atributo.entity");
const poder_entity_1 = require("../../../database/entities/postgres/poder.entity");
const confronto_dto_1 = require("../dtos/confronto.dto");
const resultado_batalha_confronto_enum_1 = require("../models/enums/resultado.batalha-confronto.enum");
const paginacao_dto_1 = require("../dtos/paginacao.dto");
const confronto_editoras_response_dto_1 = require("../dtos/confronto.editoras.response.dto");
const log_enum_1 = require("../../../common/log/models/enums/log.enum");
let SuperheroiService = class SuperheroiService {
    constructor(alinhamentoEntityRepository, corEntityRepository, editoraEntityRepository, generoEntityRepository, racaEntityRepository, superHeroiEntityRepository, atributoEntityRepository, poderEntityRepository, logService) {
        this.alinhamentoEntityRepository = alinhamentoEntityRepository;
        this.corEntityRepository = corEntityRepository;
        this.editoraEntityRepository = editoraEntityRepository;
        this.generoEntityRepository = generoEntityRepository;
        this.racaEntityRepository = racaEntityRepository;
        this.superHeroiEntityRepository = superHeroiEntityRepository;
        this.atributoEntityRepository = atributoEntityRepository;
        this.poderEntityRepository = poderEntityRepository;
        this.logService = logService;
    }
    async pegarParametrosCadastro() {
        const parametrosCadastroResponseDto = new parametros_cadastro_response_dto_1.ParametrosCadastroResponseDto();
        parametrosCadastroResponseDto.nomeCompleto = 'livre';
        parametrosCadastroResponseDto.nomeSuperHeroi = 'livre';
        parametrosCadastroResponseDto.peso = 'livre';
        parametrosCadastroResponseDto.altura = 'livre';
        const generoEntitys = await this.generoEntityRepository.find();
        const coresEntitys = await this.corEntityRepository.find();
        const racaEntitys = await this.racaEntityRepository.find();
        const editoraEntitys = await this.editoraEntityRepository.find();
        const alinhamentoEntitys = await this.alinhamentoEntityRepository.find();
        generoEntitys.forEach(genero => {
            parametrosCadastroResponseDto.genero.push({ nome: genero.genero, id: genero.id });
        });
        coresEntitys.forEach(cor => {
            parametrosCadastroResponseDto.corDaPele.push({ nome: cor.cor, id: cor.id });
        });
        coresEntitys.forEach(cor => {
            parametrosCadastroResponseDto.corDoCabelo.push({ nome: cor.cor, id: cor.id });
        });
        coresEntitys.forEach(cor => {
            parametrosCadastroResponseDto.corDoOlho.push({ nome: cor.cor, id: cor.id });
        });
        racaEntitys.forEach(raca => {
            parametrosCadastroResponseDto.raca.push({ nome: raca.raca, id: raca.id });
        });
        editoraEntitys.forEach(editora => {
            parametrosCadastroResponseDto.editora.push({ nome: editora.editora, id: editora.id });
        });
        alinhamentoEntitys.forEach(alinhamento => {
            parametrosCadastroResponseDto.alinhamento.push({ nome: alinhamento.alignment, id: alinhamento.id });
        });
        return parametrosCadastroResponseDto;
    }
    async listarTodosSuperHerois() {
        const superHeroiEntities = await this.superHeroiEntityRepository.find();
        const arraySuperHeroiResponseDto = [];
        superHeroiEntities.forEach(superHeroiEntity => {
            let superHeroiResponseDto = new super_heroi_response_dto_1.SuperHeroiResponseDto();
            this.alimentarSuperHeroiResponseDto(superHeroiResponseDto, superHeroiEntity);
            arraySuperHeroiResponseDto.push(superHeroiResponseDto);
        });
        return arraySuperHeroiResponseDto;
    }
    async listarTodosSuperHeroisDetalhado(paginacaoDto) {
        let usarPaginacao = true;
        const superHeroiEntities = await this.consultaSuperHeroisDetalhado(paginacaoDto, usarPaginacao);
        const arraySuperHeroiDetalhadoResponseDto = [];
        superHeroiEntities.forEach(superHeroiEntity => {
            let superHeroiDetalhadoResponseDto = new super_heroi_detalhado_response_dto_1.SuperHeroiDetalhadoResponseDto();
            this.alimentarSuperHeroiDetalhadoResponseDto(superHeroiDetalhadoResponseDto, superHeroiEntity);
            arraySuperHeroiDetalhadoResponseDto.push(superHeroiDetalhadoResponseDto);
        });
        return arraySuperHeroiDetalhadoResponseDto;
    }
    async cadastrarSuperHeroi(cadastroSuperHeroiRequestDto) {
        const generoEntity = await this.generoEntityRepository.findOne({ where: { id: cadastroSuperHeroiRequestDto.generoId } });
        const corDoOlhoEntity = await this.corEntityRepository.findOne({ where: { id: cadastroSuperHeroiRequestDto.corDoOlhoId } });
        const corDoCabeloEntity = await this.corEntityRepository.findOne({ where: { id: cadastroSuperHeroiRequestDto.corDoCabeloId } });
        const corDaPeleEntity = await this.corEntityRepository.findOne({ where: { id: cadastroSuperHeroiRequestDto.corDaPeleId } });
        const racaEntity = await this.racaEntityRepository.findOne({ where: { id: cadastroSuperHeroiRequestDto.racaId } });
        const editoraEntity = await this.editoraEntityRepository.findOne({ where: { id: cadastroSuperHeroiRequestDto.editoraId } });
        const alinhamentoEntity = await this.alinhamentoEntityRepository.findOne({ where: { id: cadastroSuperHeroiRequestDto.alinhamentoId } });
        this.validarEntradaIdEntidades(generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity);
        const superHeroiEntity = new super_heroi_entity_1.SuperHeroiEntity();
        this.alimentarEntidadeSuperHeroi(superHeroiEntity, generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity, cadastroSuperHeroiRequestDto.nomeCompleto, cadastroSuperHeroiRequestDto.altura, cadastroSuperHeroiRequestDto.peso, cadastroSuperHeroiRequestDto.nomeSuperHeroi);
        const heroiExiste = await this.verificarHeroiJaExiste(generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity, cadastroSuperHeroiRequestDto.nomeCompleto, cadastroSuperHeroiRequestDto.altura, cadastroSuperHeroiRequestDto.peso, cadastroSuperHeroiRequestDto.nomeSuperHeroi);
        if (!heroiExiste) {
            const { id, nomeSuperHeroi, nomeCompleto } = await this.superHeroiEntityRepository.save(superHeroiEntity);
            const cadastroSuperHeroiResponseDto = new cadastro_super_heroi_response_dto_1.CadastroSuperHeroiResponseDto();
            this.alimentarCadastroSuperHeroiResponseDto(cadastroSuperHeroiResponseDto, id, nomeSuperHeroi, nomeCompleto);
            this.logService.gravarLog(`Super herói ${id} criado`, log_enum_1.LogEnum.INFO);
            return cadastroSuperHeroiResponseDto;
        }
        else {
            throw new common_1.ConflictException(`Herói com essas configurações já cadastrado`);
        }
    }
    async atualizarSuperHeroi(id, atualizarSuperHeroiRequestDto) {
        const superHeroiEncontrado = await this.superHeroiEntityRepository.findOne({ where: { id } });
        if (!superHeroiEncontrado) {
            throw new common_1.BadRequestException(`Não há um super herói com o id: ${id} cadastrado no sistema!`);
        }
        const generoEntity = await this.generoEntityRepository.findOne({ where: { id: atualizarSuperHeroiRequestDto.generoId } });
        const corDoOlhoEntity = await this.corEntityRepository.findOne({ where: { id: atualizarSuperHeroiRequestDto.corDoOlhoId } });
        const corDoCabeloEntity = await this.corEntityRepository.findOne({ where: { id: atualizarSuperHeroiRequestDto.corDoCabeloId } });
        const corDaPeleEntity = await this.corEntityRepository.findOne({ where: { id: atualizarSuperHeroiRequestDto.corDaPeleId } });
        const racaEntity = await this.racaEntityRepository.findOne({ where: { id: atualizarSuperHeroiRequestDto.racaId } });
        const editoraEntity = await this.editoraEntityRepository.findOne({ where: { id: atualizarSuperHeroiRequestDto.editoraId } });
        const alinhamentoEntity = await this.alinhamentoEntityRepository.findOne({ where: { id: atualizarSuperHeroiRequestDto.alinhamentoId } });
        this.validarEntradaIdEntidades(generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity);
        const heroiExiste = await this.verificarHeroiJaExiste(generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity, atualizarSuperHeroiRequestDto.nomeCompleto, atualizarSuperHeroiRequestDto.altura, atualizarSuperHeroiRequestDto.peso, atualizarSuperHeroiRequestDto.nomeSuperHeroi);
        if (!heroiExiste) {
            await this.superHeroiEntityRepository.update({ id: id }, this.alimentarSuperHeroiEntidade(atualizarSuperHeroiRequestDto, generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity));
            this.logService.gravarLog(`Super herói ${id} atualizado`, log_enum_1.LogEnum.INFO);
        }
        else {
            throw new common_1.ConflictException(`Herói com essas configurações já cadastrado`);
        }
    }
    async deletarSuperHeroi(id) {
        const result = await this.superHeroiEntityRepository.delete({ id: id });
        if (!result.affected) {
            throw new common_1.BadRequestException(`Não há um super herói com o id: ${id} cadastrado no sistema!`);
        }
        this.logService.gravarLog(`Super herói ${id} deletado`, log_enum_1.LogEnum.INFO);
    }
    async confrontosSuperHerois(paginacaoDto) {
        let usarPaginacao = true;
        const superHeroisEntity = await this.consultaSuperHeroisDetalhado(paginacaoDto, usarPaginacao);
        const confrontos = await this.calcularConfrontosEntreDoisGruposSuperHerois(superHeroisEntity, superHeroisEntity);
        return confrontos;
    }
    async confrontoTodasEditoras(filtroConfrontoEditorasDto) {
        const editoras = await this.editoraEntityRepository.find();
        const confrontosEditoras = [];
        let editora1 = editoras[filtroConfrontoEditorasDto.numeroPagina - 1];
        let paginacaoDto = new paginacao_dto_1.FiltroEPaginacaoDto();
        paginacaoDto.editoraId = Number(editora1.id);
        const superHeroisEntityEditora1 = await this.consultaSuperHeroisDetalhado(paginacaoDto, false);
        for (const [i, value2] of editoras.entries()) {
            let editora2 = value2;
            let confrontoEditoraResponseDto = new confronto_editoras_response_dto_1.ConfrontoEditoraResponseDto();
            let editora1Dto = new confronto_editoras_response_dto_1.ElementoEditoraDto();
            editora1Dto.id = editora1.id;
            editora1Dto.nome = editora1.editora;
            let editora2Dto = new confronto_editoras_response_dto_1.ElementoEditoraDto();
            editora2Dto.id = editora2.id;
            editora2Dto.nome = editora2.editora;
            if (editora2.id != editora1.id) {
                paginacaoDto.editoraId = Number(editora2.id);
                const superHeroisEntityEditora2 = await this.consultaSuperHeroisDetalhado(paginacaoDto, false);
                const confrontos = await this.calcularConfrontosEntreDoisGruposSuperHerois(superHeroisEntityEditora1, superHeroisEntityEditora2);
                let contagemVitoriasEditora1 = 0;
                let contagemVitoriasEditora2 = 0;
                confrontos.forEach(confronto => {
                    if (confronto.resultadoConfronto === resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1) {
                        contagemVitoriasEditora1 += 1;
                    }
                    else if (confronto.resultadoConfronto === resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2) {
                        contagemVitoriasEditora2 += 1;
                    }
                });
                if (contagemVitoriasEditora1 > contagemVitoriasEditora2) {
                    confrontoEditoraResponseDto.resultado = 'VITORIA_EDITORA_1';
                }
                else if (contagemVitoriasEditora2 > contagemVitoriasEditora1) {
                    confrontoEditoraResponseDto.resultado = 'VITORIA_EDITORA_2';
                }
                else {
                    confrontoEditoraResponseDto.resultado = 'EMPATE';
                }
                editora1Dto.confrontosVencidos = contagemVitoriasEditora1;
                editora2Dto.confrontosVencidos = contagemVitoriasEditora2;
            }
            confrontoEditoraResponseDto.editora1 = editora1Dto;
            confrontoEditoraResponseDto.editora2 = editora2Dto;
            confrontosEditoras.push(confrontoEditoraResponseDto);
        }
        ;
        return confrontosEditoras;
    }
    async confrontoDuasEditoras(confrontoDuasEditorasParametersDto) {
        const editora1 = await this.editoraEntityRepository.findOne({ where: { id: BigInt(confrontoDuasEditorasParametersDto.idEditora1) } });
        const editora2 = await this.editoraEntityRepository.findOne({ where: { id: BigInt(confrontoDuasEditorasParametersDto.idEditora2) } });
        if (!editora1) {
            throw new common_1.BadRequestException(` A editora de id: ${confrontoDuasEditorasParametersDto.idEditora1} não existe! `);
        }
        if (!editora2) {
            throw new common_1.BadRequestException(` A editora de id: ${confrontoDuasEditorasParametersDto.idEditora2} não existe! `);
        }
        const confrontosEditoras = [];
        let paginacaoDto = new paginacao_dto_1.FiltroEPaginacaoDto();
        paginacaoDto.editoraId = Number(confrontoDuasEditorasParametersDto.idEditora1);
        const superHeroisEntityEditora1 = await this.consultaSuperHeroisDetalhado(paginacaoDto, false);
        paginacaoDto.editoraId = Number(confrontoDuasEditorasParametersDto.idEditora2);
        const superHeroisEntityEditora2 = await this.consultaSuperHeroisDetalhado(paginacaoDto, false);
        let confrontoEditoraResponseDto = new confronto_editoras_response_dto_1.ConfrontoEditoraResponseDto();
        let editora1Dto = new confronto_editoras_response_dto_1.ElementoEditoraDto();
        editora1Dto.id = editora1.id;
        editora1Dto.nome = editora1.editora;
        let editora2Dto = new confronto_editoras_response_dto_1.ElementoEditoraDto();
        editora2Dto.id = editora2.id;
        editora2Dto.nome = editora2.editora;
        const confrontos = await this.calcularConfrontosEntreDoisGruposSuperHerois(superHeroisEntityEditora1, superHeroisEntityEditora2);
        let contagemVitoriasEditora1 = 0;
        let contagemVitoriasEditora2 = 0;
        confrontos.forEach(confronto => {
            if (confronto.resultadoConfronto === resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1) {
                contagemVitoriasEditora1 += 1;
            }
            else if (confronto.resultadoConfronto === resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2) {
                contagemVitoriasEditora2 += 1;
            }
        });
        if (contagemVitoriasEditora1 > contagemVitoriasEditora2) {
            confrontoEditoraResponseDto.resultado = 'VITORIA_EDITORA_1';
        }
        else if (contagemVitoriasEditora2 > contagemVitoriasEditora1) {
            confrontoEditoraResponseDto.resultado = 'VITORIA_EDITORA_2';
        }
        else {
            confrontoEditoraResponseDto.resultado = 'EMPATE';
        }
        editora1Dto.confrontosVencidos = contagemVitoriasEditora1;
        editora2Dto.confrontosVencidos = contagemVitoriasEditora2;
        confrontoEditoraResponseDto.editora1 = editora1Dto;
        confrontoEditoraResponseDto.editora2 = editora2Dto;
        confrontosEditoras.push(confrontoEditoraResponseDto);
        return confrontosEditoras;
    }
    validarEntradaIdEntidades(generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity) {
        if (!generoEntity) {
            throw new common_1.BadRequestException(`Esse valor para o campo generoId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
        }
        if (!corDoOlhoEntity) {
            throw new common_1.BadRequestException(`Esse valor para o campo corDoOlhoId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
        }
        if (!corDoCabeloEntity) {
            throw new common_1.BadRequestException(`Esse valor para o campo corDoCabeloId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
        }
        if (!corDaPeleEntity) {
            throw new common_1.BadRequestException(`Esse valor para o campo corDaPeleId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
        }
        if (!racaEntity) {
            throw new common_1.BadRequestException(`Esse valor para o campo racaId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
        }
        if (!editoraEntity) {
            throw new common_1.BadRequestException(`Esse valor para o campo editoraId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
        }
        if (!alinhamentoEntity) {
            throw new common_1.BadRequestException(`Esse valor para o campo alinhamentoId não existe! Favor verificar os ids possíveis no endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'`);
        }
    }
    alimentarEntidadeSuperHeroi(superHeroiEntity, generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity, nomeCompleto, altura, peso, nomeSuperHeroi) {
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
    alimentarCadastroSuperHeroiResponseDto(cadastroSuperHeroiResponseDto, id, nomeSuperHeroi, nomeCompleto) {
        cadastroSuperHeroiResponseDto.id = id;
        cadastroSuperHeroiResponseDto.nomeSuperHeroi = nomeSuperHeroi;
        cadastroSuperHeroiResponseDto.nomeCompleto = nomeCompleto;
    }
    alimentarSuperHeroiResponseDto(superHeroiResponseDto, superHeroiEntity) {
        superHeroiResponseDto.idSuperHeroi = superHeroiEntity.id;
        superHeroiResponseDto.alinhamento = { nome: superHeroiEntity.alinhamento?.alignment, id: superHeroiEntity.alinhamento?.id };
        superHeroiResponseDto.altura = superHeroiEntity.altura;
        superHeroiResponseDto.corDaPele = { nome: superHeroiEntity.corDaPele?.cor, id: superHeroiEntity.corDaPele?.id };
        superHeroiResponseDto.corDoCabelo = { nome: superHeroiEntity.corDoCabelo?.cor, id: superHeroiEntity.corDoCabelo?.id };
        superHeroiResponseDto.corDoOlho = { nome: superHeroiEntity.corDoOlho?.cor, id: superHeroiEntity.corDoOlho?.id };
        superHeroiResponseDto.editora = { nome: superHeroiEntity.editora?.editora, id: superHeroiEntity.editora?.id };
        superHeroiResponseDto.genero = { nome: superHeroiEntity.genero?.genero, id: superHeroiEntity.genero?.id };
        superHeroiResponseDto.nomeCompleto = superHeroiEntity.nomeCompleto;
        superHeroiResponseDto.nomeSuperHeroi = superHeroiEntity.nomeSuperHeroi;
        superHeroiResponseDto.peso = superHeroiEntity.peso;
        superHeroiResponseDto.raca = { nome: superHeroiEntity.raca?.raca, id: superHeroiEntity.raca?.id };
    }
    alimentarSuperHeroiDetalhadoResponseDto(superHeroiDetalhadoResponseDto, superHeroiEntity) {
        superHeroiDetalhadoResponseDto.idSuperHeroi = superHeroiEntity.id;
        superHeroiDetalhadoResponseDto.alinhamento = { nome: superHeroiEntity.alinhamento?.alignment, id: superHeroiEntity.alinhamento?.id };
        superHeroiDetalhadoResponseDto.altura = superHeroiEntity.altura;
        superHeroiDetalhadoResponseDto.corDaPele = { nome: superHeroiEntity.corDaPele?.cor, id: superHeroiEntity.corDaPele?.id };
        superHeroiDetalhadoResponseDto.corDoCabelo = { nome: superHeroiEntity.corDoCabelo?.cor, id: superHeroiEntity.corDoCabelo?.id };
        superHeroiDetalhadoResponseDto.corDoOlho = { nome: superHeroiEntity.corDoOlho?.cor, id: superHeroiEntity.corDoOlho?.id };
        superHeroiDetalhadoResponseDto.editora = { nome: superHeroiEntity.editora?.editora, id: superHeroiEntity.editora?.id };
        superHeroiDetalhadoResponseDto.genero = { nome: superHeroiEntity.genero?.genero, id: superHeroiEntity.genero?.id };
        superHeroiDetalhadoResponseDto.nomeCompleto = superHeroiEntity.nomeCompleto;
        superHeroiDetalhadoResponseDto.nomeSuperHeroi = superHeroiEntity.nomeSuperHeroi;
        superHeroiDetalhadoResponseDto.peso = superHeroiEntity.peso;
        superHeroiDetalhadoResponseDto.raca = { nome: superHeroiEntity.raca?.raca, id: superHeroiEntity.raca?.id };
        const heroiPoderes = superHeroiEntity.heroiPoderes;
        heroiPoderes.forEach(heroiPoder => {
            let poderSuperHeroiDto = new super_heroi_detalhado_response_dto_1.PoderSuperHeroiDto();
            poderSuperHeroiDto.idPoder = heroiPoder.idPoder;
            poderSuperHeroiDto.nomePoder = heroiPoder.poder.nomePoder;
            superHeroiDetalhadoResponseDto.poderes.push(poderSuperHeroiDto);
        });
        const heroiAtributos = superHeroiEntity.heroiAtributos;
        heroiAtributos.forEach(heroiAtributo => {
            let atributoSuperHeroiDto = new super_heroi_detalhado_response_dto_1.AtributoSuperheroiDto();
            atributoSuperHeroiDto.idAtributo = heroiAtributo.idAtributo;
            atributoSuperHeroiDto.nomeAtributo = heroiAtributo.atributo.nomeAtributo;
            atributoSuperHeroiDto.valorAtributo = heroiAtributo.valorAtributo;
            superHeroiDetalhadoResponseDto.atributos.push(atributoSuperHeroiDto);
        });
    }
    async verificarHeroiJaExiste(generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity, nomeCompleto, altura, peso, nomeSuperHeroi) {
        const heroiEntity = await this.superHeroiEntityRepository.findOne({ where: {
                genero: generoEntity,
                corDoOlho: corDoOlhoEntity,
                corDoCabelo: corDoCabeloEntity,
                corDaPele: corDaPeleEntity,
                raca: racaEntity,
                editora: editoraEntity,
                alinhamento: alinhamentoEntity,
                nomeCompleto: nomeCompleto,
                altura: altura,
                peso: peso,
                nomeSuperHeroi: nomeSuperHeroi
            } });
        if (heroiEntity) {
            return true;
        }
        return false;
    }
    alimentarSuperHeroiEntidade(atualizarSuperHeroiRequestDto, generoEntity, corDoOlhoEntity, corDoCabeloEntity, corDaPeleEntity, racaEntity, editoraEntity, alinhamentoEntity) {
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
        };
    }
    async consultaSuperHeroisDetalhado(paginacaoDto, usarPaginacao) {
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
            .where('1 = 1');
        if (paginacaoDto.alinhamentoId) {
            query.where("alinhamento.id = :id", { id: paginacaoDto.alinhamentoId });
        }
        if (paginacaoDto.atributoId) {
            query.where("heroiAtributos.idAtributo = :id", { id: paginacaoDto.atributoId });
        }
        if (paginacaoDto.editoraId) {
            query.where("editora.id = :id", { id: paginacaoDto.editoraId });
        }
        if (paginacaoDto.poderId) {
            query.where("heroiPoderes.idPoder = :id", { id: paginacaoDto.poderId });
        }
        if (paginacaoDto.orderByAtributoAsc && !paginacaoDto.orderByAtributoDesc) {
            query.orderBy('heroiAtributos.idAtributo', 'ASC');
        }
        else if (paginacaoDto.orderByAtributoDesc && !paginacaoDto.orderByAtributoAsc) {
            query.orderBy('heroiAtributos.idAtributo', 'DESC');
        }
        if (paginacaoDto.orderByPoderAsc && !paginacaoDto.orderByPoderDesc) {
            query.orderBy('heroiPoderes.idPoder', 'ASC');
        }
        else if (paginacaoDto.orderByPoderDesc && !paginacaoDto.orderByPoderAsc) {
            query.orderBy('heroiPoderes.idPoder', 'DESC');
        }
        if (usarPaginacao) {
            query.take(common_constants_1.DEFAULT_PAGE_SIZE.SUPERHEROI);
            if (paginacaoDto.numeroPagina) {
                query.skip(common_constants_1.DEFAULT_PAGE_SIZE.SUPERHEROI * (paginacaoDto.numeroPagina - 1));
            }
            else {
                query.skip(0);
            }
        }
        query.orderBy('superheroi.id', 'ASC');
        return await query.getMany();
        ;
    }
    async calcularConfrontosEntreDoisGruposSuperHerois(grupoHeroisLado1, grupoHeroisLado2) {
        const atributos = await this.atributoEntityRepository.find();
        const confrontos = [];
        grupoHeroisLado1.forEach((value1, index1) => {
            let superHeroi1 = value1;
            grupoHeroisLado2.forEach((value2, index2) => {
                if (index1 != index2) {
                    let superHeroi2 = value2;
                    let confrontoDto = new confronto_dto_1.ConfrontoDto();
                    let heroi1Dto = new confronto_dto_1.HeroiConfrontoDto();
                    heroi1Dto.id = superHeroi1.id;
                    heroi1Dto.nome = superHeroi1.nomeSuperHeroi;
                    let heroi2Dto = new confronto_dto_1.HeroiConfrontoDto();
                    heroi2Dto.id = superHeroi2.id;
                    heroi2Dto.nome = superHeroi2.nomeSuperHeroi;
                    confrontoDto.heroi1 = heroi1Dto;
                    confrontoDto.heroi2 = heroi2Dto;
                    atributos.forEach(atributo => {
                        let batalhaDto = new confronto_dto_1.BatalhaDto();
                        batalhaDto.nomeAtributo = atributo.nomeAtributo;
                        let atributosHeroi1 = superHeroi1.heroiAtributos.filter(heroiAtributo => heroiAtributo.idAtributo === atributo.id);
                        let atributosHeroi2 = superHeroi2.heroiAtributos.filter(heroiAtributo => heroiAtributo.idAtributo === atributo.id);
                        batalhaDto.valorAtributoHeroi1 = atributosHeroi1.length > 0 ? atributosHeroi1[0].valorAtributo : 0;
                        batalhaDto.valorAtributoHeroi2 = atributosHeroi2.length > 0 ? atributosHeroi2[0].valorAtributo : 0;
                        confrontoDto.heroi1 = heroi1Dto;
                        confrontoDto.heroi2 = heroi2Dto;
                        if (atributosHeroi1.length === 0) {
                            if (atributosHeroi2.length === 0) {
                                batalhaDto.resultadoBatalha = resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.EMPATE;
                            }
                            else {
                                batalhaDto.resultadoBatalha = resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2;
                            }
                        }
                        else {
                            if (atributosHeroi2.length === 0) {
                                batalhaDto.resultadoBatalha = resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1;
                            }
                            else {
                                if (atributosHeroi1[0].valorAtributo > atributosHeroi2[0].valorAtributo) {
                                    batalhaDto.resultadoBatalha = resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1;
                                }
                                else if (atributosHeroi1[0].valorAtributo === atributosHeroi2[0].valorAtributo) {
                                    batalhaDto.resultadoBatalha = resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.EMPATE;
                                }
                                else {
                                    batalhaDto.resultadoBatalha = resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2;
                                }
                            }
                        }
                        confrontoDto.batalhas.push(batalhaDto);
                    });
                    let contagemVitoriasHeroi1 = 0;
                    let contagemVitoriasHeroi2 = 0;
                    confrontoDto.batalhas.forEach(batalha => {
                        if (batalha.resultadoBatalha === resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1) {
                            contagemVitoriasHeroi1 += 1;
                        }
                        else if (batalha.resultadoBatalha === resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2) {
                            contagemVitoriasHeroi2 += 1;
                        }
                    });
                    if (contagemVitoriasHeroi1 > contagemVitoriasHeroi2) {
                        confrontoDto.resultadoConfronto = resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_1;
                    }
                    else if (contagemVitoriasHeroi2 > contagemVitoriasHeroi1) {
                        confrontoDto.resultadoConfronto = resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.VITORIA_HEROI_2;
                    }
                    else {
                        confrontoDto.resultadoConfronto = resultado_batalha_confronto_enum_1.ResultadoBatalhaConfrontoEnum.EMPATE;
                    }
                    confrontos.push(confrontoDto);
                }
            });
        });
        return confrontos;
    }
};
exports.SuperheroiService = SuperheroiService;
exports.SuperheroiService = SuperheroiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alinhamento_entity_1.AlinhamentoEntity, 'POSTGRES')),
    __param(1, (0, typeorm_1.InjectRepository)(cor_entity_1.CorEntity, 'POSTGRES')),
    __param(2, (0, typeorm_1.InjectRepository)(editora_entity_1.EditoraEntity, 'POSTGRES')),
    __param(3, (0, typeorm_1.InjectRepository)(genero_entity_1.GeneroEntity, 'POSTGRES')),
    __param(4, (0, typeorm_1.InjectRepository)(raca_entity_1.RacaEntity, 'POSTGRES')),
    __param(5, (0, typeorm_1.InjectRepository)(super_heroi_entity_1.SuperHeroiEntity, 'POSTGRES')),
    __param(6, (0, typeorm_1.InjectRepository)(atributo_entity_1.AtributoEntity, 'POSTGRES')),
    __param(7, (0, typeorm_1.InjectRepository)(poder_entity_1.PoderEntity, 'POSTGRES')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        log_service_1.LogService])
], SuperheroiService);
//# sourceMappingURL=superheroi.service.js.map