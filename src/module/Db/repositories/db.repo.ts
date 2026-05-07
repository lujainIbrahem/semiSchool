import { DeleteResult, HydratedDocument, QueryOptions, Types, UpdateQuery } from "mongoose";
import { UpdateWriteOpResult } from "mongoose";
import { Model, ProjectionType, RootFilterQuery } from "mongoose";

export class DbRepo<TDocument> {
  constructor(protected readonly model: Model<TDocument>) { }

  async create(data: Partial<TDocument>): Promise<HydratedDocument<TDocument>> {
    return this.model.create(data)
  }

  findOne(
    filter: RootFilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>) {
    return this.model.findOne(filter, projection, options);
  }


  async updateOne(
    filter: RootFilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<UpdateWriteOpResult> {
    return await this.model.updateOne(filter, update)
  }

  async findOneAndUpdate(
    {
      filter,
      update,
      options
    }: {
      filter: RootFilterQuery<TDocument>,
      update: UpdateQuery<TDocument>,
      options?: QueryOptions<TDocument>
    }
  ): Promise<TDocument | null> {
    return await this.model.findOneAndUpdate(filter, update, { new: true })
  }



  async findById(
    id: Types.ObjectId | string,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>,
    populate?: string | string[] | any
  ): Promise<TDocument | null> { // <--- تحديد النوع هنا
    let query = this.model.findById(id, projection, options);
    if (populate) query = query.populate(populate);
    return await query.exec();
  }

  async find({
    filter,
    select,
    options,
    populate
  }: {
    filter: RootFilterQuery<TDocument>,
    select?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>,
    populate?: string | string[] | any
  }) {
    let query = this.model.find(filter, select, options);
      if (populate) query = query.populate(populate);
    return await query.exec();
  }


 
 
}