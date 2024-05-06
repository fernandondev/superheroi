import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class AutenticacaoResponseDto {
    
    @ApiProperty()
    @IsJWT()
    access_token: string;

    @ApiProperty()
    @IsJWT()
    refresh_token: string;

    @ApiProperty()
    expiresIn: number;
}