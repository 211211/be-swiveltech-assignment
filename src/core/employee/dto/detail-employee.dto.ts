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

export class DetailEmployeeDto {
  @ApiProperty()
  _id: string;

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
  @Prop()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Prop()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @Prop()
  @IsEnum(GENDER_OPTIONS)
  gender: GENDER_OPTIONS;
}
