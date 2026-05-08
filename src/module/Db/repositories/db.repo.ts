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



 
 
}