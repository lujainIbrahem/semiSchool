import { Model } from "mongoose";
import { HrevokeTokenDocument, revokeToken } from "../models";
import { DbRepo } from "./db.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class revokeTokenRepo extends DbRepo<HrevokeTokenDocument>{
    constructor(@InjectModel(revokeToken.name) protected override readonly model: Model<HrevokeTokenDocument>){
        super(model)
    }
}