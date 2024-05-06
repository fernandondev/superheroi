import { BadRequestException, ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CriarUsuarioRequestDto } from '../dtos/criar.usuario.request.dto';
import {hashSync as bcryptHashSync} from 'bcryptjs';
import { UsuarioDto } from '../dtos/usuario.dto';
import { AtualizarUsuarioRequestDto } from '../dtos/atualizar.usuario.request.dto';
import { UsuarioEntity } from 'src/database/entities/postgres/usuario.entity';
import { LogService } from 'src/common/log/log.service';
import { LogEnum } from 'src/common/log/models/enums/log.enum';

@Injectable()
export class UsuarioService {

    private logger = new Logger('UsuarioService');
    constructor (
        @InjectRepository(UsuarioEntity, 'POSTGRES') private readonly usuarioRepository : Repository<UsuarioEntity>,
        private readonly logService: LogService
    ) {  }

    async criar ( novoUsuarioDto: CriarUsuarioRequestDto ) {
        const usuarioJaCadastrado = await this.usuarioRepository.find( { 
            where: [
                {cpf: novoUsuarioDto.cpf},
                {email: novoUsuarioDto.email}
            ]
         } );
         //Verifica se já existe um usuário para esse cpf ou email.
         if( usuarioJaCadastrado.length != 0 ) {
            throw new ConflictException(`Usuário com o email ou cpf informado já cadastrado`);
         }
         let dataAtual = new Date();
        
         const usuarioDb = new UsuarioEntity();
         usuarioDb.cpf = novoUsuarioDto.cpf;
         usuarioDb.nome = novoUsuarioDto.nome;
         usuarioDb.email = novoUsuarioDto.email;
         usuarioDb.senha = bcryptHashSync(novoUsuarioDto.senha, 10);
         //Salva imagem base64 no banco
         usuarioDb.fotoBase64 = novoUsuarioDto.fotoBase64;
         usuarioDb.criadoEm =  dataAtual;
         usuarioDb.ativo = true;
         const { id, cpf } = await this.usuarioRepository.save( usuarioDb );
        
         this.logService.gravarLog( `Usuário ${usuarioDb.id} criado`, LogEnum.INFO );
         
         return { id, cpf };
    }

    async pesquisarPorId( id: string ): Promise<UsuarioDto | null> {
        const usuarioEncontrado = await this.usuarioRepository.findOne( { where: { id } } );

        if(!usuarioEncontrado) {
            throw new BadRequestException(`Não há um usuário com o id: ${id} cadastrado no sistema!`);
        }

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
        }
    }

    async pesquisarPorCpf( cpf: string ): Promise<UsuarioDto | null> {
        const usuarioEncontrado = await this.usuarioRepository.findOne({
            where: { cpf: cpf}
            
        })

        if(!usuarioEncontrado) {
            return null;
        }

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
        }
    }

    async pesquisarPorEmailOuCpf(email: string, cpf: string): Promise<UsuarioDto | null> {
        const usuarioEncontrado = await this.usuarioRepository.findOne({
            where: [
                { email: email },
                { cpf: cpf}
            ]
        })

        if(!usuarioEncontrado) {
            return null;
        }

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
        }
    }

    async atualizar( id: string, atualizarUsuarioRequestDto: AtualizarUsuarioRequestDto ) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({ where: { id } });

        if( atualizarUsuarioRequestDto.email !== undefined ) {
            const usuarioEmail = await this.usuarioRepository.findOne({ where: { email: atualizarUsuarioRequestDto.email }})
            if(usuarioEmail) {
                throw new ConflictException({ message: `Já existe um usuário com o email ${usuarioEncontrado.email} no sistema` });
            }
        }
        

        if( !usuarioEncontrado ) {
            throw new BadRequestException({ message: `Usuário com o id ${usuarioEncontrado.id} não encontrado` });
        }
        

        await this.usuarioRepository.update(id, this.mapDtoParaEntityAtualizarUsuarioRequestDto( atualizarUsuarioRequestDto ));   

        this.logService.gravarLog( `Usuário ${usuarioEncontrado.id} atualizado`, LogEnum.INFO );
    }

    async atualizarIat( id: string, iatDate: Date ) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({ where: { id } });

        if( !usuarioEncontrado ) {
            throw new BadRequestException({ message: `Usuário com o id ${usuarioEncontrado.id} não encontrado` });
        }
        usuarioEncontrado.iatUltimoToken = iatDate;

        await this.usuarioRepository.update(id, usuarioEncontrado );   

    }

    async desativarUsuario( id: string ) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({ where: { id } });

        if( !usuarioEncontrado ) {
            throw new BadRequestException({ message: `Usuário com o id ${usuarioEncontrado.id} não encontrado` });
        }
            
        usuarioEncontrado.ativo = false;

        await this.usuarioRepository.update(id, usuarioEncontrado );   

    }

    private mapDtoParaEntityAtualizarUsuarioRequestDto( atualizarUsuarioRequestDto: AtualizarUsuarioRequestDto ): Partial<UsuarioEntity>{
        
        if( atualizarUsuarioRequestDto.senha !== undefined ) {
            return {
                nome: atualizarUsuarioRequestDto.nome,
                email: atualizarUsuarioRequestDto.email,
                fotoBase64: atualizarUsuarioRequestDto.fotoBase64,
                senha: bcryptHashSync(atualizarUsuarioRequestDto.senha, 10)
            }
        }
        
        return {
            nome: atualizarUsuarioRequestDto.nome,
            email: atualizarUsuarioRequestDto.email,
            fotoBase64: atualizarUsuarioRequestDto.fotoBase64,
        }
    }


}
