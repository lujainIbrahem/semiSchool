import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { statusType } from 'src/common';

@Schema({ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }, strictQuery: true })
export class appointment {
  @Prop({ type: Types.ObjectId, required: true, ref: "User" })
  doctorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: "User" })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: "availableTime" })
  availableId: Types.ObjectId;

  @Prop({ type: String, required: true, enum: statusType })
  status: statusType;

  @Prop({ type: Date })
  date: Date;
}

export type HappointmentDocument = HydratedDocument<appointment>

export const appointmentSchema = SchemaFactory.createForClass(appointment)

appointmentSchema.index(
  { patientId: 1, date: 1 ,doctorId :1},
  { unique: true, partialFilterExpression: { status: "confirmed" } }
)

export const appointmentModel = MongooseModule.forFeature([
  {
    name: appointment.name,
    schema: appointmentSchema
  }
])