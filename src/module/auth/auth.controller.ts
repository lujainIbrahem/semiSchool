import { Controller, Get, Post, Body, Res, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { completeProfileDTO, loginWithGmail } from './authDTO';
import type{ UserReq } from 'src/common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ====================== login with Google via idToken ======================
  @Post('loginWithGmail')
  async loginWithGmail(@Body() body: loginWithGmail,) {
    return this.authService.loginWithGmail(body.idToken,body.role);
  }

  // ====================== completeProfile ======================

  @Patch('completeProfile')
  async completeProfile(
    @Req() req:UserReq,
    @Body() body: completeProfileDTO,
  )
     {
    return this.authService.completeProfile(req,body);
  }

}