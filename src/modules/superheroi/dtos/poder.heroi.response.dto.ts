import { ApiProperty } from "@nestjs/swagger";

export class PoderHeroiResponseDto{

    @ApiProperty()
    idPoder: bigint;

    @ApiProperty()
    nomePoder: string;

}