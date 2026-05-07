import { Body, Controller, Post, } from '@nestjs/common';
import {   loginDTO,  signUpDTO } from './signUpDTO';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

constructor(private readonly userService :UserService){}

@Post("signUp")
signUp(
    @Body() body:signUpDTO,
){
    return this.userService.signUp(body)
}


@Post("login")
login(
    @Body() body:loginDTO,
){
    return this.userService.login(body)
}





}
