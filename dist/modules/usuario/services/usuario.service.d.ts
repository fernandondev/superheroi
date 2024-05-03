import { Repository } from 'typeorm';
import { CriarUsuarioRequestDto } from '../dtos/criar.usuario.request.dto';
import { UsuarioDto } from '../dtos/usuario.dto';
import { AtualizarUsuarioRequestDto } from '../dtos/atualizar.usuario.request.dto';
import { UsuarioEntity } from 'src/database/entities/postgres/usuario.entity';
import { LogService } from 'src/common/log/log.service';
export declare class UsuarioService {
    private readonly usuarioRepository;
    private readonly logService;
    private logger;
    constructor(usuarioRepository: Repository<UsuarioEntity>, logService: LogService);
    criar(novoUsuarioDto: CriarUsuarioRequestDto): Promise<{
        id: string;
        cpf: string;
    }>;
    pesquisarPorId(id: string): Promise<UsuarioDto | null>;
    pesquisarPorCpf(cpf: string): Promise<UsuarioDto | null>;
    pesquisarPorEmailOuCpf(email: string, cpf: string): Promise<UsuarioDto | null>;
    atualizar(id: string, atualizarUsuarioRequestDto: AtualizarUsuarioRequestDto): Promise<void>;
    atualizarIat(id: string, iatDate: Date): Promise<void>;
    desativarUsuario(id: string): Promise<void>;
    private mapDtoParaEntityAtualizarUsuarioRequestDto;
}
