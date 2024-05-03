import { ConfigService } from '@nestjs/config/dist';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './entities/mongo/LogEntity';

@Module({
    imports: [TypeOrmModule.forRootAsync({ 
        name: 'POSTGRES',
        useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: +configService.get<string>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities: [__dirname +'/entities/postgres/**'],
            migrations: [__dirname + '/migrations/postgres/*.ts'],
            synchronize: false
        }),
        inject: [ConfigService]
     }),
     TypeOrmModule.forRootAsync({ 
        name: 'MONGO_DB',
        useFactory: async (configService: ConfigService) => ({
            type: 'mongodb',
            url: configService.get("DATABASE_MONGO_URL"),
            entities: [LogEntity],
            migrations: [__dirname + '/migrations/mongo/*.ts'],
            synchronize: false
        }),
        inject: [ConfigService]
     })
    ],
    exports: [TypeOrmModule],
})
export class DbModule {}
