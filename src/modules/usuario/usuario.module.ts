import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioEntity } from 'src/database/entities/postgres/usuario.entity';
import { LogModule } from 'src/common/log/log.module';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
  imports: [
  TypeOrmModule.forFeature([UsuarioEntity], 'POSTGRES'), 
  LogModule
],
})
export class UsuarioModule {}
