import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDefined, IsOptional } from 'class-validator'

export class AutenticacaoLoginRequestDto {

    @ApiProperty({
        description: 'Email do usuário',
        required: false,
        example: 'email@email.com'
    })
    @IsString({message: 'O email deve ser uma string.'})
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        description: 'Cpf do usuário',
        required: false,
        example: '111.111.111-11'
    })
    @IsString({message: 'O cpf deve ser uma string.'})
    @IsOptional()
    cpf: string;

    @ApiProperty({
        description: 'Senha do usuário',
        required: true,
        example: 'senhadousuario123456'
    })
    @IsDefined({message: 'Senha é obrigatória'})
    @IsString({message: 'A senha deve ser uma string.'})
    senha: string;

}