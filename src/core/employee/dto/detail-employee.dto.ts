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
  @IsSriLankaPhoneNumber('LK')
  phoneNumber: string;

  @ApiProperty()
  @Prop()
  @IsEnum(GENDER_OPTIONS)
  gender: GENDER_OPTIONS;

  @ApiProperty({ example: 'https://randomuser.me/api/portraits/men/92.jpg' })
  @IsOptional()
  @IsString()
  @IsUrl()
  photo: string;
}
