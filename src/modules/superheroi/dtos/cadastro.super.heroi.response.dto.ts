import { IsString, IsEmail, IsDefined, IsOptional } from 'class-validator'

export class CadastroSuperHeroiResponseDto {

    id: bigint;
    nomeSuperHeroi: string;
    nomeCompleto: string;

}