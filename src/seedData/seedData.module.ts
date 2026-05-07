import { Module } from '@nestjs/common';
import { UserModel } from '../module/Db/models';
import {   UserRepo } from '../module/Db';
import { seedDataController } from './seedData.controller';
import { seedDataService } from './seedData.service';

@Module({
  imports:[UserModel],
  controllers:[seedDataController],
  providers: [seedDataService,UserRepo],
})

export class seedDataModule {}



