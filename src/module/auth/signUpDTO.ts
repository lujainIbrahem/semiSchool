import {  IsArray, IsBoolean, isBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length, Matches, Max, Min, ValidateIf } from "class-validator"
import { Types } from "mongoose";
import { IsMatch } from "src/common/decorator";
import {  bloodType, flagType, GenderType, specializationType, UserRoleEnum } from "src/common/enums";
import { IAvailableTime } from "src/common/interfaces";
import { PickType } from '@nestjs/mapped-types';


export class signUpDTO {
   
    @IsStrongPassword()
    @IsNotEmpty({message:"password is required"})
    password:string

    
  @IsMatch(["password"])
  @ValidateIf((data: signUpDTO) => { return Boolean(data.password) })
  cPassword: string


}