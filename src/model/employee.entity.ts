import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type EmployeeDocument = EmployeeEntity & Document;

export enum GENDER_OPTIONS {
  M,
  F,
}

export enum USER_STATUS {
  IN_ACTIVE,
  ACTIVE,
}

@Schema({ collection: 'employee' })
export class EmployeeEntity {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty()
  @MinLength(6)
  @MinLength(10)
  firstName: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty()
  @MinLength(6)
  @MinLength(10)
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

  @ApiProperty()
  @Prop()
  @IsEnum(USER_STATUS)
  status: USER_STATUS; // 0: inactive, 1: active

  @ApiProperty()
  @IsOptional()
  @Prop()
  @IsString()
  @IsUrl()
  photo: string;

  @ApiProperty()
  @Prop()
  createdAt: number;

  @ApiProperty()
  @Prop()
  updatedAt: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(EmployeeEntity);
