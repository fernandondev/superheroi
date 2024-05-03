import { ConfigService } from '@nestjs/config/dist';
import {config} from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UsuarioEntity } from './entities/postgres/usuario.entity';




config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [ UsuarioEntity],
    migrations: [__dirname + '/migrations/postgres/*.ts'],
    synchronize: false    
}

export default new DataSource(dataSourceOptions);