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
const atributo_entity_1 = require("../../../database/entities/postgres/atributo.entity");
const cor_entity_1 = require("../../../database/entities/postgres/cor.entity");
const editora_entity_1 = require("../../../database/entities/postgres/editora.entity");
const genero_entity_1 = require("../../../database/entities/postgres/genero.entity");
const heroi_atributo_entity_1 = require("../../../database/entities/postgres/heroi.atributo.entity");
const poder_entity_1 = require("../../../database/entities/postgres/poder.entity");
const raca_entity_1 = require("../../../database/entities/postgres/raca.entity");
const super_heroi_entity_1 = require("../../../database/entities/postgres/super.heroi.entity");
const log_service_1 = require("../../../common/log/log.service");
const parametros_cadastro_response_dto_1 = require("../dtos/parametros.cadastro.response.dto");
const super_heroi_response_dto_1 = require("../dtos/super.heroi.response.dto");
let SuperheroiService = class SuperheroiService {
    constructor(alinhamentoEntityRepository, atributoEntityRepository, corEntityRepository, editoraEntityRepository, generoEntityRepository, heroiAtributoEntityRepository, poderEntityRepository, racaEntityRepository, superHeroiEntityRepository, logService) {
        this.alinhamentoEntityRepository = alinhamentoEntityRepository;
        this.atributoEntityRepository = atributoEntityRepository;
        this.corEntityRepository = corEntityRepository;
        this.editoraEntityRepository = editoraEntityRepository;
        this.generoEntityRepository = generoEntityRepository;
        this.heroiAtributoEntityRepository = heroiAtributoEntityRepository;
        this.poderEntityRepository = poderEntityRepository;
        this.racaEntityRepository = racaEntityRepository;
        this.superHeroiEntityRepository = superHeroiEntityRepository;
        this.logService = logService;
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
};
exports.SuperheroiService = SuperheroiService;
exports.SuperheroiService = SuperheroiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alinhamento_entity_1.AlinhamentoEntity, 'POSTGRES')),
    __param(1, (0, typeorm_1.InjectRepository)(atributo_entity_1.AtributoEntity, 'POSTGRES')),
    __param(2, (0, typeorm_1.InjectRepository)(cor_entity_1.CorEntity, 'POSTGRES')),
    __param(3, (0, typeorm_1.InjectRepository)(editora_entity_1.EditoraEntity, 'POSTGRES')),
    __param(4, (0, typeorm_1.InjectRepository)(genero_entity_1.GeneroEntity, 'POSTGRES')),
    __param(5, (0, typeorm_1.InjectRepository)(heroi_atributo_entity_1.HeroiAtributoEntity, 'POSTGRES')),
    __param(6, (0, typeorm_1.InjectRepository)(poder_entity_1.PoderEntity, 'POSTGRES')),
    __param(7, (0, typeorm_1.InjectRepository)(raca_entity_1.RacaEntity, 'POSTGRES')),
    __param(8, (0, typeorm_1.InjectRepository)(super_heroi_entity_1.SuperHeroiEntity, 'POSTGRES')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
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