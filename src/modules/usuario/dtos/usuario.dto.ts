import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

@ApiExtraModels(UsuarioPutParameters)
export class UsuarioPutParameters {

    @ApiProperty({
        description: 'id do usuário',
        required: true,
        example: 'aaaaaaaa-bbbb-1ccc-8ddd-eeeeeeeeeeee'
    })
    @IsUUID()
    id:string;
}

export class UsuarioDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    cpf: string;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    fotoBase64: string;

    @ApiProperty()
    senha: string;

    @ApiProperty()
    criadoEm: Date;

    @ApiProperty()
    iatUltimoToken: Date;

    @ApiProperty()
    ativo: boolean;
}

