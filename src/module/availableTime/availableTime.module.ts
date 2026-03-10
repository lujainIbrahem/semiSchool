import { Module } from '@nestjs/common';
import { availableTimeRepo,UserModel, UserRepo } from '../Db';
import { availableTimeModel } from '../Db/models/availableTime.model';
import { availableTimeService } from './availableTime.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';
import { availableTimeController } from './availableTime.controller';

@Module({
  imports:[availableTimeModel,UserModel],
  controllers:[availableTimeController],
  providers: [availableTimeService,availableTimeRepo,UserRepo,TokenService,JwtService],
})

export class availableTimeModule {}



