import { Module } from '@nestjs/common';
import { appointmentModel, availableTimeModel, OtpModel, revokeTokenModel, UserModel } from '../module/Db/models';
import { appointmentRepo, availableTimeRepo, OtpRepo, revokeTokenRepo, UserRepo } from '../module/Db';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';
import { seedDataController } from './seedData.controller';
import { seedDataService } from './seedData.service';

@Module({
  imports:[UserModel,OtpModel,appointmentModel,availableTimeModel,revokeTokenModel],
  controllers:[seedDataController],
  providers: [seedDataService,availableTimeRepo,appointmentRepo,UserRepo,OtpRepo,revokeTokenRepo,TokenService,JwtService],
})

export class seedDataModule {}



