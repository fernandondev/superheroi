import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsPositive } from "class-validator";

export class ConfrontoDuasEditorasParametersDto {
    
    @ApiProperty({
        description: 'id editora 1',
        required: true,
        example: 12
    })
    @IsDefined()
    @IsInt()
    @IsPositive()
    idEditora1: number;

    @ApiProperty({
        description: 'id editora 2',
        required: true,
        example: 10
    })
    @IsDefined()
    @IsInt()
    @IsPositive()
    idEditora2: number;
}