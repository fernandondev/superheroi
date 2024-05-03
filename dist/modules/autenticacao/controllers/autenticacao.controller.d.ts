import { AutenticacaoService } from '../services/autenticacao.service';
import { AutenticacaoResponseDto } from '../dtos/autenticacao.response.dto';
import { AutenticacaoLoginRequestDto } from '../dtos/autenticacao.login.request.dto';
import { AutenticacaoRenovaTokenRequestDto } from '../dtos/autenticacao.renova.token.request.dto';
export declare class AutenticacaoController {
    private readonly autenticacaoService;
    constructor(autenticacaoService: AutenticacaoService);
    login(autenticacaoLoginRequestDto: AutenticacaoLoginRequestDto): Promise<AutenticacaoResponseDto>;
    logout(accessToken: string): Promise<void>;
    inativarUsuario(accessToken: string): Promise<void>;
    reautenticar(autenticacaoRenovaTokenRequestDto: AutenticacaoRenovaTokenRequestDto): Promise<AutenticacaoResponseDto>;
}
