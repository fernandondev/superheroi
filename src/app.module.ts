import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { CacheModule } from '@nestjs/cache-manager';
import { LogModule } from './common/log/log.module';
import { SuperheroiModule } from './modules/superheroi/superheroi.module';

@Module({
  imports: [ 
    UsuarioModule, 
    ConfigModule.forRoot({ isGlobal: true }) , 
    DbModule,
    AutenticacaoModule,
    LogModule,
    SuperheroiModule,
    CacheModule.register(
      {
        isGlobal: true,
        ttl: 15 * 1000,
      }
    )
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
