import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import * as express from 'express';
import { Queue } from 'bull';
import { QueueService } from './queue/queue.service'; // Import QueueService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create an instance of QueueService to access the queue
  const queueService = app.get(QueueService);
  const myQueue: Queue = queueService['myQueue']; // Access the queue instance

  // Create an Express app for Bull Board
  const serverAdapter = new ExpressAdapter();
  const appQueue = express();
  serverAdapter.setBasePath('/admin/queues');

  // Create Bull Board
  createBullBoard({
    queues: [
      new BullAdapter(myQueue), // Now using the actual queue instance
    ],
    serverAdapter,
  });

  appQueue.use('/admin/queues', serverAdapter.getRouter());
  app.use(appQueue);

  await app.listen(3000);
}
bootstrap();
