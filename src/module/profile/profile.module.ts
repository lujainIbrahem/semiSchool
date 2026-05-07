import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UserModel } from '../Db/models';
import {  UserRepo } from '../Db';
import { profileService } from './profile.service';

@Module({
  imports:[UserModel],
  controllers:[ProfileController],
  providers: [profileService,UserRepo],
})

export class profileModule {}



