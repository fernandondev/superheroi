import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber } from "class-validator";

export class DeleteSuperHeroiParameter {

    @ApiProperty({
        required: true,
        example: 23
    })
    @IsDefined({ message: 'O parâmetro id é obrigatório' })
    @IsNumber()
    id: number
}