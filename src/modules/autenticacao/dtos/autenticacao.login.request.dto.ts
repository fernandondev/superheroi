import { IsString, IsEmail, IsDefined, IsOptional } from 'class-validator'

export class AutenticacaoLoginRequestDto {

    @IsString({message: 'O email deve ser uma string.'})
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString({message: 'O cpf deve ser uma string.'})
    @IsOptional()
    cpf: string;

    @IsDefined({message: 'Senha é obrigatória'})
    @IsString({message: 'A senha deve ser uma string.'})
    senha: string;

}