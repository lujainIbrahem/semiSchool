import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import {   UserRepo } from '../Db';
import {  loginDTO,  signUpDTO, } from './signUpDTO';
import {  GenderType } from 'src/common/enums';
import { Compare } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,

  ) { }
  //======================== signUp =====================

  async signUp(body: signUpDTO) {
    const { fName, lName, userName, password, email, gender, age , grade,hobbies,subjects} = body
    const userExist = await this.userRepo.findOne({ email })
    if (userExist) {
      throw new ConflictException('User already exist');
    }
  const user = await this.userRepo.create({
        fName, lName,
        userName,
        password,
        email,
        grade,
        subjects,
        hobbies,
        age,
        gender: gender ? (gender as GenderType) : GenderType.male,
      })

    return {message:"created Done" ,user}
  }

  //======================== login =====================


  async login(body: loginDTO) {
    const { email, password } = body

    const user = await this.userRepo.findOne({ email })

    if (!user) {
      throw new BadRequestException("User not found");
    }
    if (!await Compare({ plainText: password, hash: user.password })) {
      throw new BadRequestException("Invalid password");
    }

  const { password: _, ...result } = user.toObject();

  return {
    message: "Done",
    user: result
  }
  }

 



}


