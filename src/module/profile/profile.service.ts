import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepo } from '../Db';
import { Types } from 'mongoose';
import { UserReq } from 'src/common/interfaces';
import { profileDTO, updateProfileDTO } from './profileDTO';
import { Compare } from 'src/utils';

@Injectable()
export class profileService {
  constructor(
    private readonly userRepo: UserRepo,

  ) { }


  //======================== getProfileByLogin =====================

async getProfile(id: string) {
  const user = await this.userRepo.findById(id);

  if (!user) {
    throw new BadRequestException("User not found");
  }

  const { password, ...result } = user.toObject();

  return {
    message: "Done",
    user: result
  };
}
  //======================== updateProfile =====================

  async updateProfile(body: updateProfileDTO) {
    const { email, oldPassword, newPassword, ...profile } = body

    const user = await this.userRepo.findOne({email})
    if (!user) {
      throw new BadRequestException("user not found")
    }

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      throw new BadRequestException("both old and new password are required");
    }

    if (oldPassword && newPassword) {
      if (!await Compare({ plainText: oldPassword, hash: user.password })) {
        throw new BadRequestException("invalid password")
      }
      user.password = newPassword
    }
Object.assign(user, profile);

  await user.save();

  const { password , ...result } = user.toObject();

  return {
    message: "Update Done",
    user: result
  };

  }



}


