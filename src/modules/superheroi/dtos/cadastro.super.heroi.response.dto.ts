import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDefined, IsOptional } from 'class-validator'

export class CadastroSuperHeroiResponseDto {

    @ApiProperty()
    id: bigint;

    @ApiProperty()
    nomeSuperHeroi: string;

    @ApiProperty()
    nomeCompleto: string;

}