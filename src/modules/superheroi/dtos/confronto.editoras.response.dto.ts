import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";


@ApiExtraModels(ElementoEditoraDto)
export class ElementoEditoraDto {
    id: bigint;
    nome: string;
    confrontosVencidos: number;
}

export class ConfrontoEditoraResponseDto{

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoEditoraDto)
    editora1: ElementoEditoraDto;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoEditoraDto)
    editora2: ElementoEditoraDto;

    @ApiProperty()
    resultado: string;
}


