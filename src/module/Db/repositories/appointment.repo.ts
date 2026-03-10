import { Model } from "mongoose";
import { HappointmentDocument, appointment } from "../models";
import { DbRepo } from "./db.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class appointmentRepo extends DbRepo<HappointmentDocument>{
    constructor(@InjectModel(appointment.name) protected override readonly model: Model<HappointmentDocument>){
        super(model)
    }
}