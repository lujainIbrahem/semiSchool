import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { OtpModel, revokeTokenModel, UserModel } from '../Db/models';
import { OtpRepo, revokeTokenRepo, UserRepo } from '../Db';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';
import { profileService } from './profile.service';

@Module({
  imports:[UserModel,OtpModel,revokeTokenModel],
  controllers:[ProfileController],
  providers: [profileService,UserRepo,OtpRepo,revokeTokenRepo,TokenService,JwtService],
})

export class profileModule {}



