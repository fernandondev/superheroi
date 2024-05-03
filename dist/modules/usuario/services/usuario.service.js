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
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const usuario_entity_1 = require("../../../database/entities/postgres/usuario.entity");
const log_service_1 = require("../../../common/log/log.service");
const log_enum_1 = require("../../../common/log/models/enums/log.enum");
let UsuarioService = class UsuarioService {
    constructor(usuarioRepository, logService) {
        this.usuarioRepository = usuarioRepository;
        this.logService = logService;
        this.logger = new common_1.Logger('UsuarioService');
    }
    async criar(novoUsuarioDto) {
        const usuarioJaCadastrado = await this.usuarioRepository.find({
            where: [
                { cpf: novoUsuarioDto.cpf },
                { email: novoUsuarioDto.email }
            ]
        });
        if (usuarioJaCadastrado.length != 0) {
            throw new common_1.ConflictException(`Usuário com o email ou cpf informado já cadastrado`);
        }
        let dataAtual = new Date();
        const usuarioDb = new usuario_entity_1.UsuarioEntity();
        usuarioDb.cpf = novoUsuarioDto.cpf;
        usuarioDb.nome = novoUsuarioDto.nome;
        usuarioDb.email = novoUsuarioDto.email;
        usuarioDb.senha = (0, bcrypt_1.hashSync)(novoUsuarioDto.senha, 10);
        usuarioDb.fotoBase64 = novoUsuarioDto.fotoBase64;
        usuarioDb.criadoEm = dataAtual;
        usuarioDb.ativo = true;
        const { id, cpf } = await this.usuarioRepository.save(usuarioDb);
        this.logService.gravarLog(`UsuarioService->criar(novoUsuarioDto)   Usuário ${usuarioDb.id} criado`, log_enum_1.LogEnum.INFO);
        return { id, cpf };
    }
    async pesquisarPorId(id) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioEncontrado) {
            throw new common_1.BadRequestException(`Não há um usuário com o id: ${id} cadastrado no sistema!`);
        }
        this.logService.gravarLog(`UsuarioService->pesquisarPorId( id)   Pesquisa usuário ${usuarioEncontrado.id}`, log_enum_1.LogEnum.INFO);
        return {
            id: usuarioEncontrado.id,
            cpf: usuarioEncontrado.cpf,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            fotoBase64: usuarioEncontrado.fotoBase64,
            senha: usuarioEncontrado.senha,
            criadoEm: usuarioEncontrado.criadoEm,
            iatUltimoToken: usuarioEncontrado.iatUltimoToken,
            ativo: usuarioEncontrado.ativo
        };
    }
    async pesquisarPorCpf(cpf) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({
            where: { cpf: cpf }
        });
        if (!usuarioEncontrado) {
            return null;
        }
        this.logService.gravarLog(`UsuarioService->pesquisarPorCpf( cpf)    Pesquisa usuário ${usuarioEncontrado.id}`, log_enum_1.LogEnum.INFO);
        return {
            id: usuarioEncontrado.id,
            cpf: usuarioEncontrado.cpf,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            fotoBase64: usuarioEncontrado.fotoBase64,
            senha: usuarioEncontrado.senha,
            criadoEm: usuarioEncontrado.criadoEm,
            iatUltimoToken: usuarioEncontrado.iatUltimoToken,
            ativo: usuarioEncontrado.ativo
        };
    }
    async pesquisarPorEmailOuCpf(email, cpf) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({
            where: [
                { email: email },
                { cpf: cpf }
            ]
        });
        if (!usuarioEncontrado) {
            return null;
        }
        this.logService.gravarLog(`UsuarioService->pesquisarPorEmailOuCpf(email, cpf)    Pesquisa usuário ${usuarioEncontrado.id}`, log_enum_1.LogEnum.INFO);
        return {
            id: usuarioEncontrado.id,
            cpf: usuarioEncontrado.cpf,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            fotoBase64: usuarioEncontrado.fotoBase64,
            senha: usuarioEncontrado.senha,
            criadoEm: usuarioEncontrado.criadoEm,
            iatUltimoToken: usuarioEncontrado.iatUltimoToken,
            ativo: usuarioEncontrado.ativo
        };
    }
    async atualizar(id, atualizarUsuarioRequestDto) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({ where: { id } });
        const usuarioComCpfPassado = await this.pesquisarPorCpf(atualizarUsuarioRequestDto.cpf);
        if (!usuarioEncontrado) {
            throw new common_1.BadRequestException({ message: `Usuário com o id ${usuarioEncontrado.id} não encontrado` });
        }
        if (usuarioComCpfPassado) {
            throw new common_1.BadRequestException({ message: `Cpf já cadastrado` });
        }
        await this.usuarioRepository.update(id, this.mapDtoParaEntityAtualizarUsuarioRequestDto(atualizarUsuarioRequestDto));
        this.logService.gravarLog(`UsuarioService->atualizar( id, atualizarUsuarioRequestDto)    Usuário ${usuarioEncontrado.id} atualizado`, log_enum_1.LogEnum.INFO);
    }
    async atualizarIat(id, iatDate) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioEncontrado) {
            throw new common_1.BadRequestException({ message: `Usuário com o id ${usuarioEncontrado.id} não encontrado` });
        }
        usuarioEncontrado.iatUltimoToken = iatDate;
        this.logService.gravarLog('UsuarioService->atualizarIat( id, iatDate)   token atualizado com sucesso', log_enum_1.LogEnum.INFO);
        await this.usuarioRepository.update(id, usuarioEncontrado);
    }
    async desativarUsuario(id) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioEncontrado) {
            throw new common_1.BadRequestException({ message: `Usuário com o id ${usuarioEncontrado.id} não encontrado` });
        }
        usuarioEncontrado.ativo = false;
        await this.usuarioRepository.update(id, usuarioEncontrado);
        this.logService.gravarLog(`UsuarioService->desativarUsuario( id )   Usuário ${usuarioEncontrado.id} desativado`, log_enum_1.LogEnum.INFO);
    }
    mapDtoParaEntityAtualizarUsuarioRequestDto(atualizarUsuarioRequestDto) {
        return {
            nome: atualizarUsuarioRequestDto.nome,
            email: atualizarUsuarioRequestDto.email,
            fotoBase64: atualizarUsuarioRequestDto.fotoBase64,
            senha: (0, bcrypt_1.hashSync)(atualizarUsuarioRequestDto.senha, 10)
        };
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity, 'POSTGRES')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        log_service_1.LogService])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map