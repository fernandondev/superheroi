import { IsDefined, IsNumber } from "class-validator";

export class AtributoHeroiRequestDtoParameters {

    @IsNumber()
    @IsDefined({ message: 'Parâmetro id é obrigatório' })
    id: bigint;

}