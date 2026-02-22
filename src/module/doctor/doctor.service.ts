import { TokenService } from '../../common/service/token.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpRepo, revokeTokenRepo, UserRepo } from '../Db';
import { Types } from 'mongoose';
import { UserReq } from 'src/common/interfaces';

import { availableTimeRepo } from '../Db/repositories/availableTime.repo';
import { createAvailableTimeDTO } from './doctorDTO';

@Injectable()
export class doctorService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly OtpRepo: OtpRepo,
    private tokenService: TokenService,
    private readonly revokeTokenRepo: revokeTokenRepo,
    private readonly availableTimeRepo: availableTimeRepo,

  ) { }

  //================== createAvailableTime =====================

//كل الدكاتره الفاضين
  async createAvailableTime(req: UserReq , body: createAvailableTimeDTO) {
    const isExist = await this.availableTimeRepo.findOne({
      doctorId:req.user.id,
      Date:body.Date,
      start:body.start
    })
    if (isExist) {
      throw new BadRequestException("isExist not found")
    }

  const availableTime= await this.availableTimeRepo.create({
      doctorId:req.user.id,
      Date:body.Date,
      start:body.start,
      end:body.end
    })
    return { message: "Done" , availableTime}

  }




}


