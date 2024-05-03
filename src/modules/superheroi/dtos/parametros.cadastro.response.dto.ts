export class ParametrosCadastroResponseDto {

    nomeSuperHeroi: string;
    nomeCompleto: string;
    genero: ElementoParametrosCadastroResponsDto[] = [];
    corDoOlho: ElementoParametrosCadastroResponsDto[] = [];
    corDoCabelo: ElementoParametrosCadastroResponsDto[] = [];
    corDaPele: ElementoParametrosCadastroResponsDto[] = [];
    raca: ElementoParametrosCadastroResponsDto[] = [];
    editora: ElementoParametrosCadastroResponsDto[] = [];
    alinhamento: ElementoParametrosCadastroResponsDto[] = [];
    altura: string;
    peso: string;

}

export class ElementoParametrosCadastroResponsDto {

    nome: string;
    id: bigint;

}