import { TokenService } from '../../common/service/token.service';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { OtpRepo, revokeTokenRepo, UserRepo } from '../Db';
import { Types } from 'mongoose';
import { UserReq } from 'src/common/interfaces';
import { profileDTO, updateProfileDTO, updateProfileIdDTO } from './profileDTO';
import { generateOTP, Role, UserOtp, UserRoleEnum } from 'src/common';
import { Compare } from 'src/utils';

@Injectable()
export class profileService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly OtpRepo: OtpRepo,
    private tokenService: TokenService,
    private readonly revokeTokenRepo: revokeTokenRepo,

  ) { }

  private async sendOtp(userId: Types.ObjectId) {
    const otp = await generateOTP()
    await this.OtpRepo.create({
      type: UserOtp.confirmEmail,
      code: otp.toString(),
      createdBy: userId,
      expireAt: new Date(Date.now() + 60 * 1000)
    })
    return otp
  }

  //======================== getProfile =====================

  async getProfile(req: UserReq) {
const user = await this.userRepo.findById(req.user._id, "-password");
    if (!user) {
      throw new BadRequestException("user not found")
    }

    return { message: "Done", user }


  }

  //======================== getProfileId =====================

  async getprofileId(req: UserReq, params: profileDTO) {
    const user = await this.userRepo.findById(params.id , "-password" ) //patient
    if (!user) {
      throw new BadRequestException("user not found")
    }

    if (req.user.role === UserRoleEnum.Doctor &&   user.doctorId?.toString() !== req.user._id.toString()) {
      throw new ForbiddenException("Not allowed");
    }
    else if (req.user.role === UserRoleEnum.Companion &&user.companionId?.toString() !== req.user._id.toString()) {
      throw new ForbiddenException("Not allowed");
    }

    return { message: "Done", user }

  }

  //======================== updateProfile =====================

  async updateProfile(req: UserReq, body: updateProfileDTO) {
    const { email, oldPassword, newPassword, ...profile } = body

    const user = await this.userRepo.findById(req.user._id , "-password")
    if (!user) {
      throw new BadRequestException("user not found")
    }

    if (email && email !== user.email) {
      const userExist = await this.userRepo.findOne({ email })
      if (userExist) {
        throw new BadRequestException("Email already taken")
      }
      user.email = email
      user.confirmed = false
      await this.sendOtp(user._id)
    }

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      throw new BadRequestException("both old and new password are required");
    }

    if (oldPassword && newPassword) {
      if (!await Compare({ plainText: oldPassword, hash: user.password })) {
        throw new BadRequestException("invalid password")
      }
      user.password = newPassword
      await this.sendOtp(user._id)
    }
    Object.assign(user, profile)
    await user.save()
    return { message: "update Done ", user }

  }

  //======================== updateProfileId =====================

  async updateProfileId(req: UserReq, body: updateProfileIdDTO, params: profileDTO) {
    const { ...profile } = body
    const user = await this.userRepo.findById(params.id, "-password")
    if (!user) {
      throw new BadRequestException("user not found")
    }
    if (req.user.role === UserRoleEnum.Doctor) {
      if (user.doctorId?.toString() !== req.user._id.toString()) {
        {
          throw new ForbiddenException("Not allowed");
        }
      }
    }
    else if (req.user.role === UserRoleEnum.Companion) {
      if (user.companionId?.toString() !== req.user._id.toString()) {
        throw new ForbiddenException("Not allowed");
      }
    }
    Object.assign(user, profile)
    await user.save()
    return { message: "update Done ", user }

  }


}


