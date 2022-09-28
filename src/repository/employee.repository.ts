import {
  EmployeeDocument,
  EmployeeEntity,
  USER_STATUS,
} from '../model/employee.entity';
import { Injectable } from '@nestjs/common';
import { Connection, FilterQuery, Model } from 'mongoose';
import * as moment from 'moment';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDto } from 'src/core/employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/core/employee/dto/update-employee.dto';

export interface IEmployeeRepository {
  createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<any>;

  updateEmployee(updateEmployeeDto: UpdateEmployeeDto): Promise<any>;

  deleteEmployee(employeeId: string): Promise<any>;

  findOne(condmitions: FilterQuery<EmployeeEntity>): Promise<EmployeeEntity>;

  findAll(): Promise<Array<EmployeeEntity>>;

  findByConditions(
    conditions: FilterQuery<EmployeeEntity>,
    sorts: any,
    offset: number,
    limit: number,
  ): Promise<Array<EmployeeEntity>>;

  countTotalByConditions(
    conditions: FilterQuery<EmployeeEntity>,
  ): Promise<number>;
}

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(EmployeeEntity.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<any> {
    const employee = new this.employeeModel({
      firstName: createEmployeeDto.firstName,
      lastName: createEmployeeDto.lastName,
      email: createEmployeeDto.email,
      phoneNumber: createEmployeeDto.phoneNumber,
      gender: createEmployeeDto.gender,
      status: USER_STATUS.ACTIVE,
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });

    return employee.save();
  }

  async updateEmployee(updateEmployeeDto: UpdateEmployeeDto): Promise<any> {
    const employee = this.employeeModel.findOne({ _id: updateEmployeeDto._id });
    if (!employee) {
      throw new Error('Employee not found!');
    }

    return employee.update({
      firstName: updateEmployeeDto.firstName,
      lastName: updateEmployeeDto.lastName,
      email: updateEmployeeDto.email,
      phoneNumber: updateEmployeeDto.phoneNumber,
      gender: updateEmployeeDto.gender,
      updatedAt: moment().valueOf(),
    });
  }

  async deleteEmployee(employeeId: string): Promise<any> {
    const employee = this.employeeModel.findOne({ _id: employeeId });
    if (!employee) {
      throw new Error('Employee not found!');
    }

    return employee.update({
      status: USER_STATUS.IN_ACTIVE,
      updatedAt: moment().valueOf(),
    });
  }

  async findAll(): Promise<Array<EmployeeEntity>> {
    return await this.employeeModel
      .find({})
      .sort({
        createdAt: -1,
      })
      .exec();
  }

  async findByConditions(
    conditions: FilterQuery<EmployeeEntity>,
    sorts: any,
    offset: number,
    limit: number,
  ): Promise<Array<EmployeeEntity>> {
    const result = await this.employeeModel
      .find(conditions, {
        status: 0,
        __v: 0,
      })
      .sort(sorts)
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  }

  async findOne(
    conditions: FilterQuery<EmployeeEntity>,
  ): Promise<EmployeeDocument> {
    return this.employeeModel
      .findOne(conditions, {
        status: 0,
        updatedAt: 0,
        createdAt: 0,
        __v: 0,
      })
      .lean();
  }

  async countTotalByConditions(
    conditions: FilterQuery<EmployeeEntity>,
  ): Promise<number> {
    return this.employeeModel.countDocuments(conditions);
  }
}
