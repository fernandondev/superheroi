import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class AutenticacaoRenovaTokenResponseDto {
    @ApiProperty()
    @IsJWT()
    token: string;
}