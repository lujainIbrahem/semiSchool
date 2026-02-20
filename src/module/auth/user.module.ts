import { Module } from '@nestjs/common';
import { OtpModel, revokeTokenModel, UserModel } from '../Db/models';
import { OtpRepo, revokeTokenRepo, UserRepo } from '../Db';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[UserModel,OtpModel,revokeTokenModel],
  controllers:[UserController],
  providers: [UserService,UserRepo,OtpRepo,revokeTokenRepo,TokenService,JwtService],
})

export class UserModule {}



