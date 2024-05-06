import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

@ApiExtraModels(ElementoSuperHeroiDetalhadoResponseDto)
export class ElementoSuperHeroiDetalhadoResponseDto {
   
    @ApiProperty()
    id: bigint;

    @ApiProperty()
    nome: string;
}

@ApiExtraModels(PoderSuperHeroiDto)
export class PoderSuperHeroiDto {

    @ApiProperty()
    idPoder: bigint;

    @ApiProperty()
    nomePoder: string;
}

@ApiExtraModels(AtributoSuperheroiDto)
export class AtributoSuperheroiDto {

    @ApiProperty()
    idAtributo: bigint;

    @ApiProperty()
    nomeAtributo: string;

    @ApiProperty()
    valorAtributo: number;
}

export class SuperHeroiDetalhadoResponseDto {


    @ApiProperty()
    idSuperHeroi: bigint;

    @ApiProperty()
    nomeSuperHeroi: string;

    @ApiProperty()
    nomeCompleto: string;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDetalhadoResponseDto)
    genero: ElementoSuperHeroiDetalhadoResponseDto;
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDetalhadoResponseDto)
    corDoOlho: ElementoSuperHeroiDetalhadoResponseDto;
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDetalhadoResponseDto)
    corDoCabelo: ElementoSuperHeroiDetalhadoResponseDto;
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDetalhadoResponseDto)
    corDaPele: ElementoSuperHeroiDetalhadoResponseDto;
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDetalhadoResponseDto)
    raca: ElementoSuperHeroiDetalhadoResponseDto;
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDetalhadoResponseDto)
    editora: ElementoSuperHeroiDetalhadoResponseDto;
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDetalhadoResponseDto)
    alinhamento: ElementoSuperHeroiDetalhadoResponseDto;
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => PoderSuperHeroiDto)
    poderes: PoderSuperHeroiDto[] = [];
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => AtributoSuperheroiDto)
    atributos: AtributoSuperheroiDto[] = [];
    
    @ApiProperty()
    altura: number;
    
    @ApiProperty()
    peso: number;

}

