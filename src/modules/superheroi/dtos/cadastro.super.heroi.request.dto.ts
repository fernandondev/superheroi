import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDefined, IsOptional, MaxLength, MinLength, IsNumber } from 'class-validator'

export class CadastroSuperHeroiRequestDto {

    @ApiProperty({
        example: 'Chapolin',
        description: `O nome é de livre escolha.`,
        required: true
    })
    @IsDefined({message: 'O campo nomeSuperHeroi é obrigatório'})
    @IsString({message: 'O campo nomeSuperHeroi deve ser uma string.'})
    @MaxLength(200, {message: 'O campo nomeSuperHeroi deve conter menos de 200 dígitos.'})
    @MinLength(3, {message: 'O campo nomeSuperHeroi conter mais de 3 dígitos.'})
    nomeSuperHeroi: string;

    @ApiProperty({
        example: 'Chapolin Colorado',
        description: `O nome completo é de livre escolha.`
        ,required: true
    })
    @IsDefined({message: 'O campo nomeCompleto é obrigatório'})
    @IsString({message: 'O campo nomeCompleto deve ser uma string.'})
    @MaxLength(200, {message: 'O campo nomeCompleto deve conter menos de 200 dígitos.'})
    @MinLength(3, {message: 'O campo nomeCompleto deve conter mais de 3 dígitos.'})
    nomeCompleto: string;

    @ApiProperty({
        example: 2,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`
        ,required: true
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    generoId: bigint;

    @ApiProperty({
        example: 3,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`
        ,required: true
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    corDoOlhoId: bigint;

    @ApiProperty({
        example: 4,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`
        ,required: true
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    corDoCabeloId: bigint;

    @ApiProperty({
        example: 5,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`
        ,required: true
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    corDaPeleId: bigint;

    @ApiProperty({
        example: 2,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`
        ,required: true
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    racaId: bigint;

    @ApiProperty({
        example: 1,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`
        ,required: true
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    editoraId: bigint;

    @ApiProperty({
        example: 2,
        description: `Os possíveis id's desse campo podem ser obtidos pelo endpoint 'superheroi/parametros-para-cadastro-e-atualizacao'.`
        ,required: true
    })
    @IsDefined({message: 'O campo generoId é obrigatório'})
    @IsNumber()
    alinhamentoId: bigint;

    @ApiProperty({
        example: 152,
        description: `A altura é em cm'.`
        ,required: true
    })
    @IsDefined({message: 'O campo altura é obrigatório'})
    @IsNumber()
    altura: number;

    @ApiProperty({
        example: 68,
        description: `O peso é em KG'.`
        ,required: true
    })
    @IsDefined({message: 'O campo peso é obrigatório'})
    @IsNumber()
    peso: number;

}