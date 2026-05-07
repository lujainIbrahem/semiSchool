import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { HUserDocument } from "src/module/Db";

export interface UserReq extends Request{
    user:HUserDocument;
    decoded:JwtPayload;
}
