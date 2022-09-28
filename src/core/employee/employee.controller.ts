import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from '../../model/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('/employee')
@ApiTags('employee')
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name);

  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(
        `create new employee with information: ${JSON.stringify(
          createEmployeeDto,
        )}`,
      );
      await this.employeeService.create(createEmployeeDto);
      res.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message: 'success',
      });
    } catch (err) {
      this.logger.error(`create new employee failed with error ${err}`);
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Get()
  @ApiOkResponse({ type: [EmployeeEntity] })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async findAll(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.employeeService.findAll(offset, limit);
      res.status(HttpStatus.OK).send({
        status: 200,
        message: 'success',
        data: data,
      });
    } catch (err) {
      this.logger.log(`find all employee failed with error ${err}`);
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Get(`/:empId`)
  @ApiOkResponse({ type: EmployeeEntity })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async findOne(@Param('empId') empId: string, @Res() res: Response) {
    try {
      const data = await this.employeeService.findOne(empId);
      res.status(HttpStatus.OK).send({
        status: 200,
        message: 'success',
        data: data,
      });
    } catch (err) {
      this.logger.log(`find employee failed with error ${err}`);
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Put('/:empId')
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description: 'User does not exits!' })
  async updateEmployee(
    @Param('empId') empId: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.debug(
        `update employee ${empId} with information: ${JSON.stringify(
          updateEmployeeDto,
        )}`,
      );

      const employee = await this.employeeService.findOne(empId);
      if (!employee) {
        res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: `User does not exits!`,
        });
      }

      updateEmployeeDto._id = empId;
      await this.employeeService.update(updateEmployeeDto);
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'success',
      });
    } catch (err) {
      this.logger.error(`update employee failed with error ${err}`);
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Delete('/:empId')
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async deleteEmployee(@Param('empId') empId: string, @Res() res: Response) {
    try {
      this.logger.log(`delete employee with id: ${empId}`);
      await this.employeeService.delete(empId);
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'success',
      });
    } catch (err) {
      this.logger.error(`delete employee failed with error ${err}`);
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }
}
