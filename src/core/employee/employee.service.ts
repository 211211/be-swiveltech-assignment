import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FilterQuery } from 'mongoose';
import { EmployeeEntity, USER_STATUS } from '../../model/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from '../../repository/employee.repository';
import { DetailEmployeeDto } from './dto/detail-employee.dto';

export interface IEmployeeService {
  // WRITE
  create(createEmployeeDto: CreateEmployeeDto): Promise<any>;
  update(updateEmployeeDto: UpdateEmployeeDto): Promise<any>;
  delete(employeeId: string): Promise<any>;

  // READ
  findOne(employeeId: string): Promise<DetailEmployeeDto>;
  findAll(offset: number, limit: number): Promise<any>;
}

@Injectable()
export class EmployeeService implements IEmployeeService {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<any> {
    return await this.employeeRepository.createEmployee(createEmployeeDto);
  }

  async update(updateEmployeeDto: UpdateEmployeeDto): Promise<any> {
    return await this.employeeRepository.updateEmployee(updateEmployeeDto);
  }

  async delete(employeeId: string): Promise<any> {
    return await this.employeeRepository.deleteEmployee(employeeId);
  }

  async findOne(employeeId: string): Promise<DetailEmployeeDto> {
    return await this.employeeRepository.findOne({
      _id: employeeId,
      status: USER_STATUS.ACTIVE,
    });
  }

  async findAll(offset = 0, limit = 10): Promise<any> {
    const conditions: FilterQuery<EmployeeEntity> = {
      status: USER_STATUS.ACTIVE,
    };

    const sorts = {
      updatedAt: -1,
    };

    const employee = await this.employeeRepository.findByConditions(
      conditions,
      sorts,
      offset,
      limit,
    );

    const total = await this.employeeRepository.countTotalByConditions(
      conditions,
    );

    return { employee, total };
  }
}
