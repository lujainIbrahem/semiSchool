import { Body, Controller, Get, Param, Patch, Query, Req } from '@nestjs/common';
import type { UserReq } from 'src/common/interfaces';
import { profileService } from './profile.service';
import {  updateProfileDTO } from './profileDTO';

@Controller('user')
export class ProfileController {

    constructor(private readonly profileService: profileService) { }


    //======================== getProfile =====================

@Get("profile/:id")
getProfile(@Param("id") id: string) {
  return this.profileService.getProfile(id);
}


    //======================== updateProfile =====================

    @Patch("updateProfile")
    updateProfile(
        @Body() body: updateProfileDTO
    ) {
        return this.profileService.updateProfile( body)
    }




}
