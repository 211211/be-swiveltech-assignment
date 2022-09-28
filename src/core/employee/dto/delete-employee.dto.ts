import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class DeleteEmployeeDto {
  @ApiProperty()
  @Prop({ required: true })
  _id: string;
}
