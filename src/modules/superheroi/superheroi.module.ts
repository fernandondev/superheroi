import { Module } from '@nestjs/common';
import { LogModule } from 'src/common/log/log.module';
import { SuperheroiService } from './services/superheroi.service';
import { SuperheroiController } from './controllers/superheroi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlinhamentoEntity } from 'src/database/entities/postgres/alinhamento.entity';
import { AtributoEntity } from 'src/database/entities/postgres/atributo.entity';
import { CorEntity } from 'src/database/entities/postgres/cor.entity';
import { EditoraEntity } from 'src/database/entities/postgres/editora.entity';
import { GeneroEntity } from 'src/database/entities/postgres/genero.entity';
import { HeroiAtributoEntity } from 'src/database/entities/postgres/heroi.atributo.entity';
import { PoderEntity } from 'src/database/entities/postgres/poder.entity';
import { RacaEntity } from 'src/database/entities/postgres/raca.entity';
import { SuperHeroiEntity } from 'src/database/entities/postgres/super.heroi.entity';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
    imports:[
        LogModule,
        TypeOrmModule.forFeature(
            [
                AlinhamentoEntity, 
                AtributoEntity, 
                CorEntity, 
                EditoraEntity, 
                GeneroEntity, 
                HeroiAtributoEntity, 
                PoderEntity, 
                RacaEntity, 
                SuperHeroiEntity
            ], 
            'POSTGRES'),
            UsuarioModule
    ],
    providers: [SuperheroiService],
    controllers: [SuperheroiController]
})
export class SuperheroiModule {}
