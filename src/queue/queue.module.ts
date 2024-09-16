// queue.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue.processor';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { EmployeeProcessor } from './employee.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/employee.entity';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379, // Have to use docker to run redis!
      },
    }),
    BullModule.registerQueue({
      name: 'my_queue',
    }),
    BullModule.registerQueue({
      name: 'employee_queue',
    }),
    TypeOrmModule.forFeature([Employee]),
  ],
  providers: [QueueProcessor, QueueService, EmployeeProcessor],
  controllers: [QueueController],
  exports: [QueueService]
})
export class QueueModule { }
