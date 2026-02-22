import { Module } from '@nestjs/common';
import { availableTimeRepo, OtpModel, OtpRepo, revokeTokenModel, revokeTokenRepo, UserModel, UserRepo } from '../Db';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';
import { ProfileController } from './doctor.controller';
import { profileService } from '../profile/profile.service';
import { availableTimeModel } from '../Db/models/availableTime.model';

@Module({
  imports:[UserModel,OtpModel,revokeTokenModel,availableTimeModel],
  controllers:[ProfileController],
  providers: [profileService,UserRepo,OtpRepo,revokeTokenRepo,TokenService,JwtService,availableTimeRepo],
})

export class doctorModule {}



