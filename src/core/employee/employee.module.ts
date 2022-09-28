import { EmployeeEntity, EmployeeSchema } from '../../model/employee.entity';

import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from '../../repository/employee.repository';
import { EmployeeService } from './employee.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmployeeEntity.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    {
      provide: 'IEmployeeRepository',
      useClass: EmployeeRepository,
    },
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
