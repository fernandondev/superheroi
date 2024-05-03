import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { AutenticacaoService } from './services/autenticacao.service';
import { AutenticacaoController } from './controllers/autenticacao.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';
import { LogModule } from 'src/common/log/log.module';

@Module({
    imports:[
        JwtModule.registerAsync({
            global: true,
            useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME')}
            }),
            inject: [ConfigService],
            }),
        UsuarioModule,
        LogModule
    ],
    providers: [AutenticacaoService],
    controllers: [AutenticacaoController]
})
export class AutenticacaoModule {}
