import { Test, TestingModule } from '@nestjs/testing';

import { EmployeeRepository } from '../../../src/repository/employee.repository';
import { EmployeeService } from './employee.service';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const repositoryMockFactory: () => MockType<EmployeeRepository> =
  jest.fn(() => ({
    findByConditions: jest.fn((entity) => entity),
    createEmployee: jest.fn((entity) => entity),
    updateEmployee: jest.fn((entity) => entity),
    deleteEmployee: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    findAll: jest.fn((entity) => entity),
    countTotalByConditions: jest.fn((entity) => entity),
  }));

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repositoryMock: MockType<EmployeeRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        // Provide your mock instead of the actual repository
        {
          provide: 'IEmployeeRepository',
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<EmployeeService>(EmployeeService);
    repositoryMock = module.get('IEmployeeRepository');
  });

  it('should return an employee list with pagination', async () => {
    const employeeList = {
      employee: [
        {
          _id: '6339d38c960bc9b2488f3e85',
          firstName: 'Adonis',
          lastName: 'Schuppe',
          email: 'Johann.Orn52@hotmail.com',
          phoneNumber: '+94771277618',
          gender: 0,
          photo: 'https://randomuser.me/api/portraits/men/36.jpg',
          createdAt: 1664734092733,
          updatedAt: 1664734092733,
        },
        {
          _id: '6339d38c960bc9b2488f3e83',
          firstName: 'Kelton',
          lastName: 'Rafsfu',
          email: 'Patrick_Ratke@gmail.com',
          phoneNumber: '+94771277688',
          gender: 1,
          photo: 'https://randomuser.me/api/portraits/men/71.jpg',
          createdAt: 1664734092731,
          updatedAt: 1664734092731,
        },
      ],
      total: 2,
    };

    repositoryMock.findByConditions.mockReturnValue(employeeList);
    expect(await service.findAll()).toEqual({
      employee: employeeList,
      total: {
        status: 1,
      },
    });
  });

  it('should find an empoyee', async () => {
    const employee = {
      _id: '6339d38c960bc9b2488f3e75',
      firstName: 'Skye54554',
      lastName: 'Rolfson',
      email: 'Angelita_Simonis@hotmail.com',
      phoneNumber: '+94771277689',
      gender: 1,
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    };
    // Now you can control the return value of your mock's methods
    repositoryMock.findOne.mockReturnValue(employee);
    expect(await service.findOne('6339d38c960bc9b2488f3e75')).toEqual(employee);
    // And make assertions on how often and with what params your mock's methods are called
    expect(repositoryMock.findOne).toHaveBeenCalledWith({
      _id: employee._id,
      status: 1,
    });
  });
});
