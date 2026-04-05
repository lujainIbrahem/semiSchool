import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepo } from "../Db"; // تأكدي من المسار الصح عندك
import { TokenService } from "src/common/service/token.service";
import { userProvider, UserRoleEnum } from "src/common";
import { OAuth2Client } from 'google-auth-library'; 

@Injectable()
export class AuthService { 
  constructor(
    private readonly userRepo: UserRepo,
    private tokenService: TokenService,
  ) {}

 async loginWithGmail(idToken: string, role: UserRoleEnum) {

    // 1. التعديل الأول: أضفنا await قبل الـ client.verifyIdToken
   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const ticket = await client.verifyIdToken({
  idToken,
  audience: process.env.GOOGLE_CLIENT_ID, // خليها نفس الـ Client ID
});
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid Google Token');
    }

  
    const email = payload.email;
    const name = payload.name || "User";
    const given_name = payload.given_name ;
    const family_name = payload.family_name;
    const email_verified = payload.email_verified || false;

    if (!email) {
      throw new BadRequestException('Email not provided by Google');
    }

    // ====================== check if user exists ======================

      let user = await this.userRepo.findOne({ email });

    if (!user) {
      // ✅ Create new user
      user = await this.userRepo.create({
        fName: given_name,
        lName: family_name,
        userName: name,
        email: email,
        confirmed: email_verified,
        provider: userProvider.google,
        role: role,
      });
    } else {
      // ✅ لو موجود
      if (user.provider !== userProvider.google) {
        throw new BadRequestException(
          "This email is registered via system. Please login with your password."
        );
      }
    }


    // ====================== generate JWTs ======================

    const access_token = await this.tokenService.GenerateToken({
      payload: { userId: user._id, email: user.email },
      options: {
        secret: user.role === UserRoleEnum.Doctor ? process.env.ACCESS_TOKEN_DOCTOR!
          : user.role === UserRoleEnum.Patient ? process.env.ACCESS_TOKEN_PATIENT!
            : process.env.ACCESS_TOKEN_COMPANION!,
        expiresIn: "1h"
      }
    });

    const refresh_token = await this.tokenService.GenerateToken({
      payload: { id: user._id, email: user.email },
      options: {
        secret: user.role == UserRoleEnum.Doctor ? process.env.REFRESH_TOKEN_DOCTOR!
          : user.role === UserRoleEnum.Patient ? process.env.REFRESH_TOKEN_PATIENT!
            : process.env.REFRESH_TOKEN_COMPANION!,
        expiresIn: "1y"
      }
    });

    return { message: 'Google Auth Success', access_token, refresh_token };
  }
}