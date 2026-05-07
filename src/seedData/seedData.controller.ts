import { Controller, Post} from '@nestjs/common';

import { seedDataService } from './seedData.service';

@Controller('seedData')
export class seedDataController {
    constructor(private readonly seedDataService: seedDataService) { }
    //======================== seedAll =====================
   
 @Post("seedAll")
async seedAll() {
  return await this.seedDataService.seedStudents();
}

}
