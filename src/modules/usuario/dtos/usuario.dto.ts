import { IsUUID } from "class-validator";

export class UsuarioDto {
    id: string;
    cpf: string;
    nome: string;
    email: string;
    fotoBase64: string;
    senha: string;
    criadoEm: Date;
    iatUltimoToken: Date;
    ativo: boolean;
}

export class UsuarioPutParameters {

    @IsUUID()
    id:string;
}