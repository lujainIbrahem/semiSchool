
import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GenderType } from 'src/common/enums';
import { Hash } from 'src/utils';

@Schema({ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }, strictQuery: true })

export class User {

  @Prop({ type: String, required: true, minlength: 2, trim: true })
  fName: string;
  @Prop({ type: String, required: true, minlength: 2, trim: true })
  lName: string;
  @Virtual({
    get() {
      return `${this.fName} ${this.lName}`
    },
    set(v) {
      this.fName = v.split(' ')[0]
      this.lName = v.split(' ')[1]
    }
  })
  userName: string;

  @Prop({ type: String, required: true, unique: true, trim: true })
  email: string;

  @Prop({ type: String, trim: true, required: true })
  password: string;

  @Prop({ type: String, enum: GenderType })
  gender: GenderType;
  
  @Prop({ type: Number, min: 10, max: 80 })
  age: number;

  @Prop({ type: String, required: true })
  grade: string;

  @Prop({ type:[String], required: true })
  subjects: string[];

    @Prop({ type:[ String], required: true })
  hobbies: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type HUserDocument = HydratedDocument<User>

export const UserModel = MongooseModule.forFeatureAsync([
  {
    name: User.name,
    useFactory: () => {
      UserSchema.pre("save", async function (next) {
        if (this.isModified("password")) {
          this.password = await Hash({ plainText: this.password });
        }
        next()
      })

      return UserSchema
    }
  }])
