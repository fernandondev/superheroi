import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

@ApiExtraModels()
export class ElementoSuperHeroiDto {

    @ApiProperty()
    nome: string;

    @ApiProperty()
    id: bigint;

}

export class SuperHeroiResponseDto {

   
    @ApiProperty()
    idSuperHeroi: bigint;

    @ApiProperty()
    nomeSuperHeroi: string;

    @ApiProperty()
    nomeCompleto: string;

    @ApiProperty()  
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDto)
    genero: ElementoSuperHeroiDto;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDto)
    corDoOlho: ElementoSuperHeroiDto;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDto)
    corDoCabelo: ElementoSuperHeroiDto;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDto)
    corDaPele: ElementoSuperHeroiDto;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDto)
    raca: ElementoSuperHeroiDto;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDto)
    editora: ElementoSuperHeroiDto;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoSuperHeroiDto)
    alinhamento: ElementoSuperHeroiDto;

    @ApiProperty()
    altura: number;

    @ApiProperty()
    peso: number;

}