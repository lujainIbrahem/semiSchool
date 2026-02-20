import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

@Schema({timestamps:true, toObject:{virtuals:true}, toJSON:{virtuals:true},strictQuery:true})

export class revokeToken {

  @Prop({type:Types.ObjectId,required:true, ref:"User"})
  userId: Types.ObjectId;

  @Prop({type:String, required: true })
  tokenId: string;

  @Prop({type:Date,required:true})
  expireAt: Date;

}

export type HrevokeTokenDocument =HydratedDocument<revokeToken>

export const revokeTokenSchema = SchemaFactory.createForClass(revokeToken);
revokeTokenSchema.index({expireAt:1},{expireAfterSeconds:0})

export const revokeTokenModel = MongooseModule.forFeature([
  {
    name: revokeToken.name,
 schema: revokeTokenSchema
  }
])