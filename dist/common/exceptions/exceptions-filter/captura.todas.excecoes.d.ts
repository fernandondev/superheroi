import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LogService } from 'src/common/log/log.service';
export declare class CapturaTodasAsExcecoes implements ExceptionFilter {
    private readonly httpAdapterHost;
    private readonly logService;
    private logger;
    constructor(httpAdapterHost: HttpAdapterHost, logService: LogService);
    catch(exception: unknown, host: ArgumentsHost): void;
}
