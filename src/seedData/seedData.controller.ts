import { Controller, Get, Post, Req } from '@nestjs/common';
import type { UserReq } from 'src/common/interfaces';
import { Auth, UserTokenTypeEnum } from 'src/common';
import { seedDataService } from './seedData.service';

@Controller('seedData')
export class seedDataController {
    constructor(private readonly seedDataService: seedDataService) { }
    //======================== seedAll =====================
   
    @Post("seedAll")
   async seedAll(
        @Req() req: UserReq,
    ) {
     await  this.seedDataService.seedAll()
    }

    @Post("seedDoctors")
  async  seedDoctors(
        @Req() req: UserReq,
    ) {
        await this.seedDataService.seedDoctors()
    }
    @Post("seedCompanion")
  async  seedCompanion(
        @Req() req: UserReq,
    ) {
        await this.seedDataService.seedCompanion()
    }

}
