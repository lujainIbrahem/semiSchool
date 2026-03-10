import { IsDate, isMongoId, IsMongoId, IsOptional, IsString,} from "class-validator";
import { Types } from "mongoose";

export class createAppointmentDTO {

  @IsMongoId()
  availableId:string
}

export class appointmentIdDTO {
  @IsMongoId()
  id: string
}
