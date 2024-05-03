export declare class UsuarioDto {
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
export declare class UsuarioPutParameters {
    id: string;
}
