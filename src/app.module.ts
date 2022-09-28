import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_DATABASE } from './config/database';
import { EmployeeModule } from './core/employee/employee.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import configs from './config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get(CONFIG_DATABASE),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true, load: configs }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
