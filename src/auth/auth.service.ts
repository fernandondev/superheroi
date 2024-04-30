import { ConfigService } from '@nestjs/config/dist';
import { AuthResponseDto } from './auth.dto';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {compareSync as bcryptCompareSync} from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {

    private jwtExpirationTimeInSeconds: number;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService        
        ) { 
            this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME');
            }

    async signIn(username: string, password: string): Promise<AuthResponseDto> {
        const foundUser = await this.usersService.findByUsername(username);

        if( !foundUser || !bcryptCompareSync(password, foundUser.password )) {
            throw new UnauthorizedException();
        }

        const payload = { sub: foundUser.id, username : foundUser.username };

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpirationTimeInSeconds };
    }
}
