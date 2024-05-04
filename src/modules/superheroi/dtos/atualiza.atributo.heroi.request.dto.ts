import { IsDefined, IsNumber } from "class-validator";

export class AtualizaAtributoHeroiRequestDto {
    @IsNumber()
    @IsDefined({ message: 'Id do herói é obrigatório' })
    idHeroi: bigint;

    @IsNumber()
    @IsDefined({ message: 'Id do atributo é obrigatório. Para obter, acione o endpoint /superheroi/atributo/todos' })
    idAtributo: bigint;

    @IsNumber()
    @IsDefined({ message: 'Valor do novo atributo é obrigatório' })
    valorNovoAtributo: number;
}