import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from '../enums';
import { roleName } from '../decorator';

@Injectable()
export class authorizationGuard implements CanActivate {
  constructor( 
    private reflector: Reflector
){}

async canActivate(context: ExecutionContext): Promise<boolean> {

  const req = context.switchToHttp().getRequest();

  const access_Rules: UserRoleEnum[] =
    this.reflector.getAllAndOverride(roleName, [
      context.getHandler(),
      context.getClass(),
    ]);

  if (!access_Rules || access_Rules.length === 0) {
    return true;
  }

  if (!access_Rules.includes(req.user.role)) {
    throw new UnauthorizedException("Not allowed");
  }

  return true;
}
}