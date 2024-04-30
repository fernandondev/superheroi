import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';
import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';

@Controller('auth')
export class AuthController {

    constructor ( private readonly authService: AuthService) { }

    @Post('login')
    async signIn(@Body('username') username: string, @Body('password') password: string ):  Promise<AuthResponseDto> {
        return await this.authService.signIn(username, password);
    }
}
