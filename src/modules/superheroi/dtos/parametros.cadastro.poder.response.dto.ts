import { ApiProperty } from "@nestjs/swagger";

export class ParametrosCadastroPoderResponseDto {

    @ApiProperty()
    idPoder: bigint;

    @ApiProperty()
    nomePoder: string;

}
