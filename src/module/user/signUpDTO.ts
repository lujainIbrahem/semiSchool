import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length, Max, Min, ValidateIf } from "class-validator"
import { IsMatch } from "src/common/decorator";
import { GenderType } from "src/common/enums";

export class loginDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsStrongPassword()
  @IsNotEmpty({ message: "password is required" })
  password: string

}

export class signUpDTO extends loginDTO {

  @IsString()
  @Length(2, 30)
  @IsOptional()
  @ValidateIf((data: signUpDTO) => { return Boolean(!data.userName) })
  fName?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((data: signUpDTO) => { return Boolean(!data.userName) })
  lName?: string;

  @IsString()
  @IsNotEmpty({ message: "Username is required" })
  @Length(3, 50)
  @ValidateIf((data: signUpDTO) => { return Boolean(!data.fName && !data.lName) })
  userName: string;

  @IsMatch(["password"])
  @ValidateIf((data: signUpDTO) => { return Boolean(data.password) })
  cPassword: string

  @IsOptional()
  @IsEnum(GenderType)
  gender?: GenderType;

  @IsOptional()
  @IsNumber()
  @Min(10)
  @Max(80)
  age?: number;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  hobbies: string[];

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  subjects: string[];

}

