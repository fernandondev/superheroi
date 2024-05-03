import { Matches, IsString, MaxLength, MinLength, IsEmail, IsDefined, IsOptional } from 'class-validator'

export class AtualizarUsuarioRequestDto {

    //Regex para cpf/cnpj
    @IsDefined({message: 'cpf é obrigatório'})
    @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {message: 'O cpf enviado não é válido.'})
    @IsString()
    @IsOptional()
    cpf: string;

    @IsDefined({message: 'Nome é obrigatório'})
    @IsString({message: 'O nome deve ser uma string.'})
    @MaxLength(200, {message: 'O nome deve conter menos de 200 dígitos.'})
    @MinLength(3, {message: 'O nome deve conter mais de 3 dígitos.'})
    @IsOptional()
    nome: string;

    //Regex para email
    @IsDefined({message: 'Email é obrigatório'})
    @IsEmail()
    @IsString({message: 'O email deve ser uma string.'})
    @MaxLength(100, {message: 'O email deve conter menos de 100 dígitos.'})
    @MinLength(10, {message: 'O email deve conter mais de 10 dígitos.'})
    @IsOptional()
    email: string;

    //Regex para base64
    @Matches(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, { message: 'A foto deve estar no formato base64' })
    @IsOptional()
    fotoBase64: string;

    //Regex validador de senha fraca
    @IsDefined({message: 'Senha é obrigatória'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Senha deve conter pelo menos uma letra maiúscula e um caracter especial (?, @, $, dentre outros)!'})
    @IsString({message: 'A senha deve ser uma string.'})
    @MaxLength(100, {message: 'A senha deve conter menos de 100 dígitos.'})
    @MinLength(8, {message: 'A senha deve conter mais de 8 dígitos.'} )
    @IsOptional()
    senha: string;
}