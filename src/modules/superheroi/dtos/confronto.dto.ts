import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { ResultadoBatalhaConfrontoEnum } from "../models/enums/resultado.batalha-confronto.enum";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

@ApiExtraModels(HeroiConfrontoDto)
export class HeroiConfrontoDto {

    @ApiProperty()
    id: bigint;

    @ApiProperty()
    nome: string;
    
}

@ApiExtraModels(BatalhaDto)
export class BatalhaDto {

    @ApiProperty()
    nomeAtributo: string;

    @ApiProperty()
    valorAtributoHeroi1: number;

    @ApiProperty()
    valorAtributoHeroi2: number;

    @ApiProperty({enum: ['VITORIA HERÓI 1', 'VITORIA HERÓI 2', 'empate']})
    resultadoBatalha: ResultadoBatalhaConfrontoEnum;

}

export class ConfrontoDto {
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => HeroiConfrontoDto)
    heroi1: HeroiConfrontoDto;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => HeroiConfrontoDto)
    heroi2: HeroiConfrontoDto;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => BatalhaDto)
    batalhas: BatalhaDto[] = [];

    @ApiProperty({enum: ['VITORIA HERÓI 1', 'VITORIA HERÓI 2', 'empate']})
    resultadoConfronto: ResultadoBatalhaConfrontoEnum;
    
}

