import { IsString, IsEmail, IsDefined, IsOptional } from 'class-validator'

export class AutenticacaoRenovaTokenRequestDto {
    @IsDefined({ message: 'O refresh_token é obrigatório' })
    refresh_token: string;
}