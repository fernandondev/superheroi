import { IsDefined, IsNumber } from "class-validator";

export class DeleteSuperHeroiParameter {
    @IsDefined({ message: 'O parâmetro id é obrigatório' })
    @IsNumber()
    id: bigint
}