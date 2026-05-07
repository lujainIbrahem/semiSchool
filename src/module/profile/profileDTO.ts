import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { signUpDTO } from "../user/signUpDTO";
import { IsMongoId, IsNotEmpty, IsOptional, IsStrongPassword, ValidateIf } from "class-validator";
import { IsMatch } from "src/common";

export class profileDTO {
  @IsMongoId()
  id: string
}

export class updateProfileDTO extends PartialType(OmitType(signUpDTO, ['password', 'cPassword'] as const)) {

  @IsOptional()
  @ValidateIf((data) => !!data.newPassword)
  @IsNotEmpty({ message: "old password is required to change password" })
  oldPassword: string;

  @IsOptional()
  @IsStrongPassword()
  newPassword: string;

  @IsOptional()
  @ValidateIf((data) => !!data.newPassword)
  @IsNotEmpty({ message: "confirm password is required" })
  @IsMatch(["newPassword"])
  cPassword: string;
}


