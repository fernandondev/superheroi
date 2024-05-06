export declare class ElementoSuperHeroiDto {
    nome: string;
    id: bigint;
}
export declare class SuperHeroiResponseDto {
    idSuperHeroi: bigint;
    nomeSuperHeroi: string;
    nomeCompleto: string;
    genero: ElementoSuperHeroiDto;
    corDoOlho: ElementoSuperHeroiDto;
    corDoCabelo: ElementoSuperHeroiDto;
    corDaPele: ElementoSuperHeroiDto;
    raca: ElementoSuperHeroiDto;
    editora: ElementoSuperHeroiDto;
    alinhamento: ElementoSuperHeroiDto;
    altura: number;
    peso: number;
}
