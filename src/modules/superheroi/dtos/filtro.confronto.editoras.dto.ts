import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsDefined, IsInt, IsPositive } from "class-validator";


export class FiltroConfrontoEditorasRequestDto {
    
    @IsInt()
    @IsPositive()
    @IsDefined()
    @ApiProperty({
        example: '2',
        description: `paginação.`,
        required: true
    })
    numeroPagina: number;

}