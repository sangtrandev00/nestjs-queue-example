// queue.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Employee } from 'src/employee/employee.entity';
import { Repository } from 'typeorm';

@Processor('employee_queue')
export class EmployeeProcessor {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) { }


  // business logic here!
  @Process('create_employee')
  async handleCreateEmployee(job: Job) {
    console.log('Processing create employee job', job.data);
    const { data } = job.data;

    // Create the employee in the database
    const newEmployee = this.employeeRepository.create(data);
    await this.employeeRepository.save(newEmployee);

    console.log('Employee created:', newEmployee);
    return newEmployee;
  }

  // Test queue! (Khi nào một queue thành công, thất bại bại? Khi nào thì nó sẽ vào waiting hay active active?)
  @Process('test_queue')
  async handleTestQueue(job: Job) {
    console.log('Starting job', job.id, 'Data:', job.data);

    // Simulate a longer process
    await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay

    console.log('Finished job', job.id);
    return { result: 'Test job completed', ...job.data };
  }
}
