import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('my_queue') private readonly myQueue: Queue, @InjectQueue('employee_queue') private readonly employeeQueue: Queue) { }

  async addJob(data: any) {
    await this.myQueue.add('my_job', data);
  }
  async addEmployeeJob(data: any) {
    await this.employeeQueue.add('create_employee', data);
  }
  async addTestQueue(data: any) {
    await this.employeeQueue.add('test_queue', data);
  }
}
