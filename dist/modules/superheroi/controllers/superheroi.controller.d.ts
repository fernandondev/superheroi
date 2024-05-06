import { SuperheroiService } from '../services/superheroi.service';
import { CadastroSuperHeroiRequestDto } from '../dtos/cadastro.super.heroi.request.dto';
import { ParametrosCadastroResponseDto } from '../dtos/parametros.cadastro.response.dto';
import { AtualizarSuperHeroiParameters, AtualizarSuperHeroiRequestDto } from '../dtos/atualizar.super.heroi.request.dto';
import { DeleteSuperHeroiParameter } from '../dtos/delete.super.heroi.parameter';
import { SuperHeroiDetalhadoResponseDto } from '../dtos/super.heroi.detalhado.response.dto';
import { ConfrontoDto } from '../dtos/confronto.dto';
import { FiltroEPaginacaoDto } from '../dtos/paginacao.dto';
import { FiltroConfrontoEditorasRequestDto } from '../dtos/filtro.confronto.editoras.dto';
import { ConfrontoEditoraResponseDto } from '../dtos/confronto.editoras.response.dto';
import { ConfrontoDuasEditorasParametersDto } from '../dtos/confronto.duas.editoras.parameters.dto';
export declare class SuperheroiController {
    private readonly superHeroiService;
    constructor(superHeroiService: SuperheroiService);
    pegarParametrosCadastro(): Promise<ParametrosCadastroResponseDto>;
    listarTodosDetalhado(paginacaoDto: FiltroEPaginacaoDto): Promise<SuperHeroiDetalhadoResponseDto[]>;
    confrontosTodosHerois(paginacaoDto: FiltroEPaginacaoDto): Promise<ConfrontoDto[]>;
    confrontoTodasEditoras(filtroConfrontoEditorasDto: FiltroConfrontoEditorasRequestDto): Promise<ConfrontoEditoraResponseDto[]>;
    confrontoDuasEditoras(confrontoDuasEditorasParametersDto: ConfrontoDuasEditorasParametersDto): Promise<ConfrontoEditoraResponseDto[]>;
    cadastrarSuperHeroi(cadastroSuperHeroiRequestDto: CadastroSuperHeroiRequestDto): Promise<import("../dtos/cadastro.super.heroi.response.dto").CadastroSuperHeroiResponseDto>;
    atualizarSuperHeroi(params: AtualizarSuperHeroiParameters, superHeroi: AtualizarSuperHeroiRequestDto): Promise<void>;
    deletarSuperHeroi(params: DeleteSuperHeroiParameter): Promise<void>;
}
