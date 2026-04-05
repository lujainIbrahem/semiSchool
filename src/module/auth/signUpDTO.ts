import {   IsEnum, IsNotEmpty,IsString,isString,IsStrongPassword,  ValidateIf } from "class-validator"
import { UserRoleEnum } from "src/common";
import { IsMatch } from "src/common/decorator";


export class loginWithGmail {
   
    @IsString()
    @IsNotEmpty({message:"idToken is required"})
    idToken:string;

    @IsEnum(UserRoleEnum)
    role:UserRoleEnum;


}