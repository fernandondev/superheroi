import { Connection } from 'typeorm';
import { LogEnum } from './models/enums/log.enum';
export declare class LogService {
    private connection;
    private readonly logger;
    constructor(connection: Connection);
    gravarLog(conteudo: string, level: LogEnum): Promise<void>;
}
