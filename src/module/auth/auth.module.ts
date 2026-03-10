import { Module } from '@nestjs/common';
import { availableTimeModel, OtpModel, revokeTokenModel, UserModel } from '../Db/models';
import { availableTimeRepo, OtpRepo, revokeTokenRepo, UserRepo } from '../Db';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports:[UserModel,OtpModel,revokeTokenModel,availableTimeModel],
  controllers:[AuthController],
  providers: [AuthService,UserRepo,OtpRepo,revokeTokenRepo,TokenService,JwtService,availableTimeRepo],
})
export class authModule {}

