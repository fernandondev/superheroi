import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
import { LogService } from 'src/common/log/log.service';
import { LogEnum } from 'src/common/log/models/enums/log.enum';
  
  
  @Catch()
  export class CapturaTodasAsExcecoes implements ExceptionFilter {

    private logger: Logger = new Logger();

    constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly logService: LogService) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
      this.logService.gravarLog( exception['message'], LogEnum.ERROR );
      //console.log(exception);
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      httpAdapter.reply(ctx.getResponse(), exception['response'], httpStatus);
    }
  }