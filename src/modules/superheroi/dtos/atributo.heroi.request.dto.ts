import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber } from "class-validator";

export class AtributoHeroiRequestDtoParameters {

    @IsNumber()
    @IsDefined({ message: 'Parâmetro id é obrigatório' })
    @ApiProperty({
        example: '3',
        description: `Esse id pode ser obtido no endpoint superheroi/atributo/parametros-para-cadastro-e-atualizacao.`
    })
    id: bigint;

}