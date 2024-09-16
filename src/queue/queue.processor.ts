// queue.processor.ts
import { Process, Processor } from '@nestjs/bull';

@Processor('my_queue')
export class QueueProcessor {
  @Process('my_job')
  async handleMyJob(job: any) {
    console.log('Processing job data:', job.data);
    // Perform some time-consuming task here
    // Example: Send an email, process a file, etc.
  }
}
