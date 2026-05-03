import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepo } from '../Db';
import { Types } from 'mongoose';
import { UserReq } from 'src/common/interfaces';
import { availableTimeRepo } from '../Db/repositories/availableTime.repo';
import { createAvailableTimeDTO, doctorIdDTO } from './availableTimeDTO';
import { TokenService } from 'src/common/service/token.service';

@Injectable()
export class availableTimeService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly availableTimeRepo: availableTimeRepo,
      private tokenService: TokenService,
    

  ) { }

  //================== createAvailableTime =====================

  //بظبط المواعيد
async createAvailableTime(req: UserReq, body: createAvailableTimeDTO) {
  const { date, start, end } = body
  const doctorId = req.user._id
const slots: any[] =[]

let current = new Date(`${date}T${start}:00`);
const endTime = new Date(`${date}T${end}:00`);

  while (current < endTime) {
    const next = new Date(current)
    next.setMinutes(next.getMinutes() + 30)

    const isExist = await this.availableTimeRepo.findOne({
      doctorId,
      date: new Date(date),
      start: current,
      end: next
    })

    if (!isExist) {
      slots.push({
        doctorId,
        date: new Date(date),
        start: current,
        end: next,
        isBooked: false
      })
    }

    current = next
  }

  await this.availableTimeRepo.createMany(slots)

  return { message: "Slots created successfully" }
}
  //================== getAvailableTime =====================

  //كل الدكاتره الفاضين
  async getAvailableTime(date: string) {
    const availableTime = await this.availableTimeRepo.find({
      filter: { date, isBooked: false },
        populate: {
        path:"doctorId",
        select:"fName lName specialization email phone peice "
      }
    });
    return { message: "Done", availableTime };
  }


  //================== getAvailableTimeId =====================

  async getAvailableTimeId(date: string, param:doctorIdDTO) {
    const isExist = await this.userRepo.findById(param.id)
    if (!isExist) {
      throw new BadRequestException("doctor not exist")
    }
    if(isExist){
      const user =new Types.ObjectId( param.id)
       const availableTime = await this.availableTimeRepo.find({
      filter: { date, isBooked: false,doctorId:user },
      populate: {
        path:"doctorId",
        select:"fName lName specialization email phone peice "
      }
    })
    return { message: "Done", availableTime };

    }
  }


}


