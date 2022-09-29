import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { GENDER_OPTIONS } from 'src/model/employee.entity';
import { IsSriLankaPhoneNumber } from 'src/validators';
import { Prop } from '@nestjs/mongoose';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'firstName' })
  @Prop({ required: true })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  firstName: string;

  @ApiProperty({ example: 'lastName' })
  @Prop({ required: true })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  lastName: string;

  @ApiProperty({ example: 'email@example.com' })
  @Prop({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+94934334343' })
  @Prop({ required: true })
  @IsSriLankaPhoneNumber('LK')
  phoneNumber: string;

  @ApiProperty({ example: 0 })
  @Prop({ required: true })
  @IsEnum(GENDER_OPTIONS)
  gender: GENDER_OPTIONS;

  @ApiProperty({ example: 'https://randomuser.me/api/portraits/men/92.jpg' })
  @IsOptional()
  @IsString()
  @IsUrl()
  photo: string;
}
