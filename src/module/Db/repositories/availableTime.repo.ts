import { Model } from "mongoose";
import { HavailableTimeDocument, availableTime } from "../models";
import { DbRepo } from "./db.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class availableTimeRepo extends DbRepo<HavailableTimeDocument>{
    constructor(@InjectModel(availableTime.name) protected override readonly model: Model<HavailableTimeDocument>){
        super(model)
    }
}