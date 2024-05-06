import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";


@ApiExtraModels()
export class ElementoParametrosCadastroResponsDto {

    @ApiProperty()
    nome: string;

    @ApiProperty()
    id: bigint;

}

export class ParametrosCadastroResponseDto {

    @ApiProperty()
    nomeSuperHeroi: string;

    @ApiProperty()
    nomeCompleto: string;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoParametrosCadastroResponsDto)
    genero: ElementoParametrosCadastroResponsDto[] = [];
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoParametrosCadastroResponsDto)
    corDoOlho: ElementoParametrosCadastroResponsDto[] = [];
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoParametrosCadastroResponsDto)
    corDoCabelo: ElementoParametrosCadastroResponsDto[] = [];
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoParametrosCadastroResponsDto)
    corDaPele: ElementoParametrosCadastroResponsDto[] = [];
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoParametrosCadastroResponsDto)
    raca: ElementoParametrosCadastroResponsDto[] = [];
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoParametrosCadastroResponsDto)
    editora: ElementoParametrosCadastroResponsDto[] = [];
    
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => ElementoParametrosCadastroResponsDto)
    alinhamento: ElementoParametrosCadastroResponsDto[] = [];
    
    @ApiProperty()
    altura: string;
    
    @ApiProperty()
    peso: string;

}
