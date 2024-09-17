import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { QueueService } from 'src/queue/queue.service';
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService, private readonly queueService: QueueService) { }

    @Post('test-queue')
    async testQueue() {
        const jobs = [
            { name: 'John Doe', position: 'Developer', salary: 75000 },
            { name: 'Jane Smith', position: 'Designer', salary: 70000 },
            { name: 'Bob Johnson', position: 'Manager', salary: 90000 },
        ];
        let i = 1;
        for (const job of jobs) {
            console.log("count", i);
            const result = await this.queueService.addTestQueue(job);
            console.log('Job result:', result);
            i++;
        }

        return { message: '3 jobs added to the queue' };
    }

    @Post()
    create(@Body() employeeData: Partial<Employee>) {
        return this.employeeService.createData(employeeData);
    }

    @Get()
    findAll() {
        return this.employeeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.employeeService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() employeeData: Partial<Employee>) {
        return this.employeeService.update(+id, employeeData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.employeeService.remove(+id);
    }
}