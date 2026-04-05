import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRoleEnum } from 'src/common';
import { loginWithGmail } from './signUpDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ====================== login with Google via idToken ======================
  @Post('loginWithGmail')
  async loginWithGmail(@Body() body: loginWithGmail,) {
    return this.authService.loginWithGmail(body.idToken,body.role);
  }


}