import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDefined, IsOptional } from 'class-validator'

export class AutenticacaoRenovaTokenRequestDto {
    @ApiProperty({
        description: 'refresh token obtido no login',
        required: true,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MzE2YTUxNi1hNmU0LTQyNDMtOWI0MC0zMzc0MGMzMWI4MzIiLCJjcGYiOiIxOTEuMjg3LjUwNy0zMCIsImlhdCI6MTcxNDk1OTc3ODc2MSwiZXhwIjoxNzE0OTU5NzgyMzYxfQ.Gwz-qLNzVLjpIUtt8nQGaKUU80UBxLmfuW-MsthmVKw'
    })
    @IsDefined({ message: 'O refresh_token é obrigatório' })
    refresh_token: string;
}