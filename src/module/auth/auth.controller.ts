import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRoleEnum } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ====================== login with Google via idToken ======================
  @Post('loginWithGmail')
  async loginWithGmail(
    @Body('idToken') idToken: string,
    @Body('role') role: UserRoleEnum

  ) {
    return this.authService.loginWithGmail(idToken,role);
  }


}