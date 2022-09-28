import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { GENDER_OPTIONS } from 'src/model/employee.entity';
import { Prop } from '@nestjs/mongoose';

export class CreateEmployeeDto {
  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  firstName: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  lastName: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsEnum(GENDER_OPTIONS)
  gender: GENDER_OPTIONS;
}
