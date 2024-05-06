import { ApiProperty } from "@nestjs/swagger";

export class ParametrosCadastroAtributoResponseDto {

    @ApiProperty()
    idAtributo: bigint;

    @ApiProperty()
    nomeAtributo: string;

}
