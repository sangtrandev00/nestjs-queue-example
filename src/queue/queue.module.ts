// queue.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue.processor';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

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
  ],
  providers: [QueueProcessor, QueueService],
  controllers: [QueueController],
})
export class QueueModule { }
