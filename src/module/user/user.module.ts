import { Module } from '@nestjs/common';
import {  UserModel } from '../Db/models';
import {   UserRepo } from '../Db';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[UserModel],
  controllers:[UserController],
  providers: [UserService,UserRepo],
})

export class UserModule {}



