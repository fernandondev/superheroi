import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from 'src/database/entities/mongo/LogEntity';
import { DbModule } from 'src/database/db.module';

@Module({
  providers: [LogService],
  exports: [LogService],
  imports: [TypeOrmModule.forFeature([LogEntity], 'MONGO_DB')
  , DbModule]
})
export class LogModule {}
