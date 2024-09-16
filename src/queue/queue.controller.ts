import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('jobs')
export class QueueController {
  constructor(private readonly myService: QueueService) {}

  @Post()
  async createJob(@Body() data: any) {
    await this.myService.addJob(data);
    return 'Job added to the queue';
  }
}
