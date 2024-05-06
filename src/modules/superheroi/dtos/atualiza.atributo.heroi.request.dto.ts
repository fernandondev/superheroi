import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber } from "class-validator";

export class AtualizaAtributoHeroiRequestDto {
    @IsNumber()
    @IsDefined({ message: 'Id do herói é obrigatório' })
    @ApiProperty({
        example: 11,
        description: `Id do herói.`,
        required: true
    })
    idHeroi: bigint;

    @IsNumber()
    @IsDefined({ message: 'Id do atributo é obrigatório. Para obter, acione o endpoint /superheroi/atributo/parametros-para-cadastro-e-atualizacao' })
    @ApiProperty({
        example: 10,
        description: `Id do atributo. Obtido em /superheroi/atributo/parametros-para-cadastro-e-atualizacao`,
        required: true
    })
    idAtributo: bigint;

    @IsNumber()
    @IsDefined({ message: 'Valor do novo atributo é obrigatório' })
    @ApiProperty({
        example: 220,
        description: `O valor do atributo é de livre escolha.`,
        required: true
    })
    valorNovoAtributo: number;
}