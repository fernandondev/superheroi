import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber } from "class-validator";

export class CadastroAtributoRequestDto {

    @ApiProperty({
        required: true,
        example: 23
    })
    @IsNumber()
    @IsDefined({ message: 'Id do herói é obrigatório' })
    idHeroi: bigint;

    @ApiProperty({
        required: true,
        example: 23
    })
    @IsNumber()
    @IsDefined({ message: 'Id do atributo é obrigatório. Para obter, acione o endpoint /superheroi/atributo/parametros-para-cadastro-e-atualizacao' })
    idAtributo: bigint;

    @ApiProperty({
        required: true,
        example: 250
    })
    @IsNumber()
    @IsDefined({ message: 'Valor do atributo é obrigatório' })
    valorAtributo: number;

}
