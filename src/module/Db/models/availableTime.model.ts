import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }, strictQuery: true })
export class availableTime {
  @Prop({ type: Date, required: true })
  start: Date;
  @Prop({ type: Date, required: true })
  end: Date;
  @Prop({ type: Types.ObjectId, required: true, ref: "User" })
  doctorId: Types.ObjectId;
  @Prop({ type: Boolean, default: false, required: true })
  isBooked: boolean;
  @Prop({ type: Date, required: true })
  date: Date;

}

export type HavailableTimeDocument = HydratedDocument<availableTime>

export const availableTimeSchema = SchemaFactory.createForClass(availableTime);
availableTimeSchema.index({ doctorId: 1, start: 1, date: 1 }, { unique: true });

export const availableTimeModel = MongooseModule.forFeature([
  {
    name: availableTime.name,
    schema: availableTimeSchema
  }
])