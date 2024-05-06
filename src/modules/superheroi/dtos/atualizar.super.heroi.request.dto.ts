import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDefined, IsOptional, MaxLength, MinLength, IsNumber, IsInt } from 'class-validator'

export class AtualizarSuperHeroiParameters {
    @ApiProperty({
        description: 'id super herói',
        required: true,
        example: 10
    })
    @IsDefined({message: 'O parãmetro id é obrigatorio'})
    @IsNumber()
    id:number;
}


export class AtualizarSuperHeroiRequestDto {

    @ApiProperty({
        required: true,
        example: 'Chapolin'
    })
    @IsDefined({message: 'O campo nomeSuperHeroi é obrigatório'})
    @IsString({message: 'O campo nomeSuperHeroi deve ser uma string.'})
    @MaxLength(200, {message: 'O campo nomeSuperHeroi deve conter menos de 200 dígitos.'})
    @MinLength(3, {message: 'O campo nomeSuperHeroi conter mais de 3 dígitos.'})
    nomeSuperHeroi: string;

    @ApiProperty({
        required: true,
        example: 'Chapolin colorado'
    })
    @IsDefined({message: 'O campo nomeCompleto é obrigatório'})
    @IsString({message: 'O campo nomeCompleto deve ser uma string.'})
    @MaxLength(200, {message: 'O campo nomeCompleto deve conter menos de 200 dígitos.'})
    @MinLength(3, {message: 'O campo nomeCompleto deve conter mais de 3 dígitos.'})
    nomeCompleto: string;

    @ApiProperty({
        required: true,
        example: 2
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    generoId: bigint;

    @ApiProperty({
        required: true,
        example: 2
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    corDoOlhoId: bigint;

    @ApiProperty({
        required: true,
        example: 2
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    corDoCabeloId: bigint;

    @ApiProperty({
        required: true,
        example: 2
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    corDaPeleId: bigint;

    @ApiProperty({
        required: true,
        example: 2
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    racaId: bigint;

    @ApiProperty({
        required: true,
        example: 2
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    editoraId: bigint;

    @ApiProperty({
        required: true,
        example: 2
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    alinhamentoId: bigint;

    @ApiProperty({
        description: 'altura em cm',
        required: true,
        example: 194
    })
    @IsDefined({message: 'O campo altura em '})
    @IsNumber()
    altura: number;

    @ApiProperty({
        description: 'peso em kg',
        required: true,
        example: 64
    })
    @IsDefined({message: 'O campo peso é obrigatório'})
    @IsNumber()
    peso: number;
}

