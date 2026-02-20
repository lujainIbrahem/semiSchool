import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, HUserDocument } from '../models/user.model';
import { DbRepo } from './db.repo';

@Injectable()
export class UserRepo extends DbRepo<HUserDocument> {
  constructor(@InjectModel(User.name) protected override readonly model: Model<HUserDocument>) {
    super(model);
  }
}
