import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber } from "class-validator";

export class CadastroPoderRequestDto {

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
    @IsDefined({ message: 'Id do Poder é obrigatório. Para obter, acione o endpoint /superheroi/poder/parametros-para-cadastro-e-atualizacao' })
    idPoder: bigint;
}
