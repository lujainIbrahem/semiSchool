import { Body, Controller, Get, Req } from '@nestjs/common';
import type { UserReq } from 'src/common/interfaces';
import { Auth, UserTokenTypeEnum } from 'src/common';
import { doctorService } from './doctor.service';
import { createAvailableTimeDTO } from './doctorDTO';

@Controller('doctor')
export class ProfileController {

    constructor(private readonly doctorService: doctorService) { }


    //======================== createAvailableTime =====================
    @Auth({
        roles: [],
        typeToken: UserTokenTypeEnum.access
    })
    @Get("createAvailableTime")
    createAvailableTime(
        @Req() req: UserReq,
        @Body() body:createAvailableTimeDTO
    ) {
        return this.doctorService.createAvailableTime(req,body)
    }



}
