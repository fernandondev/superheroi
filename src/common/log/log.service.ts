import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from 'src/database/entities/mongo/LogEntity';
import { Connection, MongoRepository, Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { LogEnum } from './models/enums/log.enum';

@Injectable()
export class LogService {

    private readonly logger = new Logger('Log');
    constructor (
       @InjectConnection('MONGO_DB') private connection: Connection
    ) {  }

    async gravarLog( conteudo: string, level: LogEnum) {
        const logEntity = new LogEntity();
        logEntity.conteudo = conteudo;
        logEntity.createdAt = new Date();
        logEntity.level = level;
        let mongoRepository : MongoRepository<LogEntity> = this.connection.getMongoRepository<LogEntity>(LogEntity);
        mongoRepository.save(logEntity);
        if ( level === LogEnum.ERROR ) {
            this.logger.error( conteudo );
        } else if ( level === LogEnum.WARNING ) {
            this.logger.warn( conteudo );
        } else if ( level === LogEnum.INFO ) {
            this.logger.verbose( conteudo );
        }

    }
}
