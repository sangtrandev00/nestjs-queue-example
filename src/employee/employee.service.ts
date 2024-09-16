import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        private readonly queueService: QueueService
    ) { }



    async createData(employeeData: Partial<Employee>) {
        // Add the job to the queue
        await this.queueService.addEmployeeJob({
            type: 'CREATE_EMPLOYEE',
            data: employeeData
        });

        return { message: 'Employee creation job added to queue' };
    }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    async findOne(id: number): Promise<Employee> {
        return this.employeeRepository.findOne({ where: { id } });
    }

    async update(id: number, employeeData: Partial<Employee>): Promise<Employee> {
        await this.employeeRepository.update(id, employeeData);
        return this.employeeRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.employeeRepository.delete(id);
    }
}