import { SuperheroiService } from '../services/superheroi.service';
import { CadastroSuperHeroiRequestDto } from '../dtos/cadastro.super.heroi.request.dto';
import { ParametrosCadastroResponseDto } from '../dtos/parametros.cadastro.response.dto';
import { SuperHeroiResponseDto } from '../dtos/super.heroi.response.dto';
import { AtualizarSuperHeroiParameters, AtualizarSuperHeroiRequestDto } from '../dtos/atualizar.super.heroi.request.dto';
import { DeleteSuperHeroiParameter } from '../dtos/delete.super.heroi.parameter';
export declare class SuperheroiController {
    private readonly superHeroiService;
    constructor(superHeroiService: SuperheroiService);
    pegarParametrosCadastro(): Promise<ParametrosCadastroResponseDto>;
    listarTodos(): Promise<SuperHeroiResponseDto[]>;
    cadastrarSuperHeroi(cadastroSuperHeroiRequestDto: CadastroSuperHeroiRequestDto): Promise<import("../dtos/cadastro.super.heroi.response.dto").CadastroSuperHeroiResponseDto>;
    atualizarSuperHeroi(params: AtualizarSuperHeroiParameters, superHeroi: AtualizarSuperHeroiRequestDto): Promise<void>;
    deletarSuperHeroi(params: DeleteSuperHeroiParameter): Promise<void>;
}
