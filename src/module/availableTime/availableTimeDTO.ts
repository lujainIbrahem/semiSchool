import { IsDate, IsDateString, IsMongoId, IsString,} from "class-validator";
import { Types } from "mongoose";

export class createAvailableTimeDTO {

  @IsString()
  start: string;

  @IsString()
  end: string;

  @IsDateString()
  date: string;

}

export class doctorIdDTO {
  @IsMongoId()
  id: string
}

