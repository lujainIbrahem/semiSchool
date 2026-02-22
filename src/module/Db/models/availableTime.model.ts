import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({timestamps:true, toObject:{virtuals:true}, toJSON:{virtuals:true},strictQuery:true})
export class availableTime {

  @Prop({type:String,required:true})
  start: string;

  @Prop({type:String,required:true})
  end: string;

  @Prop({type:Types.ObjectId,required:true, ref:"User"})
  doctorId: Types.ObjectId;

  @Prop({type:Boolean,default:false, required: true })
  isBooked: boolean;

  @Prop({type:Date,required:true})
  Date: Date;


}

export type HavailableTimeDocument =HydratedDocument<availableTime>

export const availableTimeSchema = SchemaFactory.createForClass(availableTime);
   
export const availableTimeModel = MongooseModule.forFeature([
  {
    name: availableTime.name,
 schema: availableTimeSchema
  }
])