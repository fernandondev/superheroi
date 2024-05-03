import { UsuarioService } from '../services/usuario.service';
import { CriarUsuarioRequestDto } from '../dtos/criar.usuario.request.dto';
import { UsuarioDto, UsuarioPutParameters } from '../dtos/usuario.dto';
import { AtualizarUsuarioRequestDto } from '../dtos/atualizar.usuario.request.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    criar(usuario: CriarUsuarioRequestDto): Promise<{
        id: string;
        cpf: string;
    }>;
    pesquisarPorId(id: string): Promise<UsuarioDto>;
    atualizar(params: UsuarioPutParameters, usuario: AtualizarUsuarioRequestDto): Promise<void>;
}
