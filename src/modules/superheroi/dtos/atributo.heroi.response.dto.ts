import { ApiProperty } from "@nestjs/swagger";

export class AtributoHeroiResponseDto{

    @ApiProperty()
    idAtributo: bigint;

    @ApiProperty()
    nomeAtributo: string;

    @ApiProperty()
    valorAtributo: number;

}