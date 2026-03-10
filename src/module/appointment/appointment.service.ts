import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { appointmentRepo, UserRepo } from '../Db';
import { Types } from 'mongoose';
import { UserReq } from 'src/common/interfaces';
import { availableTimeRepo } from '../Db/repositories/availableTime.repo';
import { appointmentIdDTO, createAppointmentDTO } from './appointmentDTO';
import { TokenService } from 'src/common/service/token.service';
import { statusType } from 'src/common';

@Injectable()
export class appointmentService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly availableTimeRepo: availableTimeRepo,
    private readonly appointmentRepo: appointmentRepo,
    private tokenService: TokenService,


  ) { }

  //================== createAppointment =====================
  //بظبط المواعيد
  async createAppointment(req: UserReq, body: createAppointmentDTO) {
    const { availableId } = body;
    const patientId = req.user._id;
    const available = await this.availableTimeRepo.findById(availableId);
    if (!available) throw new BadRequestException("Slot not found");
    if (available.isBooked) throw new BadRequestException("Slot already booked");

    const doctorId = available.doctorId;

    const date = available.date;
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    const alreadyBooked = await this.appointmentRepo.findOne({
      doctorId,
      patientId,
      status: statusType.confirmed,
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    if (alreadyBooked) {
      throw new BadRequestException("You already have a confirmed appointment with this doctor today");
    }

    const appointment = await this.appointmentRepo.create({
      doctorId,
      patientId,
      availableId: new Types.ObjectId(availableId),
      status: statusType.confirmed,
      date: date
    });

    available.isBooked = true;
    await available.save();

    const fullAppointment = await this.appointmentRepo.findById(
      appointment._id,
      {},
      {},
      {
        path: 'availableId',
        select: 'start end isBooked',
        populate: {
          path: 'doctorId',
          select: 'userName specialization email phone peice'
        }
      }
    );

    return { message: "Done", appointment: fullAppointment };
  }

  //================== cancelAppointment =====================

  async cancelAppointment(req: UserReq, param: appointmentIdDTO) {
    const appointment = await this.appointmentRepo.findById(param.id)
    if (!appointment) {
      throw new BadRequestException("this aapointment not exist")
    }
    const isAllowed = appointment.doctorId.toString() === req.user._id.toString() ||
      appointment.patientId.toString() === req.user._id.toString()
    if (!isAllowed) {
      throw new ForbiddenException("Not allowed to cancel this appointment");

    }

    appointment.status = statusType.cancelled
    await appointment.save()

    await this.availableTimeRepo.findByIdAndUpdate({
      id: appointment.availableId,
      update: { isBooked: false }
    })

    return { message: "Done", appointment };

  }




}


