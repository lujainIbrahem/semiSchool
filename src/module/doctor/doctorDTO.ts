import { IsDate, IsOptional, IsString,} from "class-validator";
import { Types } from "mongoose";

export class createAvailableTimeDTO {
  @IsString()
  start: string

  @IsDate()
  Date: Date

  @IsOptional()
  @IsString()
  end: string


  doctorId: Types.ObjectId
}
