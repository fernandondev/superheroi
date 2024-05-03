import { IsString, IsEmail, IsDefined, IsOptional, MaxLength, MinLength, IsNumber } from 'class-validator'


export class AtualizarSuperHeroiRequestDto {
    @IsDefined({message: 'O campo nomeSuperHeroi é obrigatório'})
    @IsString({message: 'O campo nomeSuperHeroi deve ser uma string.'})
    @MaxLength(200, {message: 'O campo nomeSuperHeroi deve conter menos de 200 dígitos.'})
    @MinLength(3, {message: 'O campo nomeSuperHeroi conter mais de 3 dígitos.'})
    nomeSuperHeroi: string;

    @IsDefined({message: 'O campo nomeCompleto é obrigatório'})
    @IsString({message: 'O campo nomeCompleto deve ser uma string.'})
    @MaxLength(200, {message: 'O campo nomeCompleto deve conter menos de 200 dígitos.'})
    @MinLength(3, {message: 'O campo nomeCompleto deve conter mais de 3 dígitos.'})
    nomeCompleto: string;

    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    generoId: bigint;

    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    corDoOlhoId: bigint;

    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    corDoCabeloId: bigint;

    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    corDaPeleId: bigint;

    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    racaId: bigint;

    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    editoraId: bigint;

    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    alinhamentoId: bigint;

    @IsDefined({message: 'O campo altura é obrigatório'})
    @IsNumber()
    altura: number;

    @IsDefined({message: 'O campo peso é obrigatório'})
    @IsNumber()
    peso: number;
}

export class AtualizarSuperHeroiParameters {
    @IsDefined({message: 'O parãmetro id é obrigatorio'})
    @IsNumber()
    id:bigint;
}