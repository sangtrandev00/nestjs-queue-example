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
    await this.employeeQueue.add('create_employee', data, {
      attempts: 1,
    });
  }
  async addTestQueue(data: any) {
    await this.employeeQueue.add('test_queue', data);
  }
}

// What's my_queue ? and employee_queue ?
// my_queue is a queue that I created for testing
// employee_queue is a queue that I created for processing employee data

// What's different between employee_queue and create_employee ?
// employee_queue is a queue that I created for processing employee data
// create_employee is a job that I created for processing employee data

// What's bull-board ?
// bull-board is a web interface for managing queues

// What's bull ?
// bull is a queue library for Node.js