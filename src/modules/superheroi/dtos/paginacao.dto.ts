import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsInt, IsOptional, IsPositive } from "class-validator";

export class FiltroEPaginacaoDto {

    @ApiProperty({
        required: true,
        example: 3
    })
    @IsInt()
    @IsPositive()
    @IsDefined()
    numeroPagina: number;

    @ApiProperty({
        description: 'Ordenar os atributos decrescentemente',
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    orderByAtributoDesc: boolean;

    @ApiProperty({
        description: 'Ordenar os atributos ascendentemente',
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    orderByAtributoAsc: boolean;

    @ApiProperty({
        description: 'Ordenar os poderes decrescentemente',
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    orderByPoderDesc: boolean;

    @ApiProperty({
        description: 'Ordenar os poderes ascendentemente',
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    orderByPoderAsc: boolean

    @ApiProperty({
        description: 'id do atributo',
        required: false,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    atributoId: number;

    @ApiProperty({
        description: 'id do poder',
        required: false,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    poderId: number;

    @ApiProperty({
        description: 'id do alinhamento',
        required: false,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    alinhamentoId: number;

    @ApiProperty({
        description: 'id do atributo',
        required: false,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    editoraId: number;
}