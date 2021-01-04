import { Types } from "mongoose";

export abstract class MongoEntity implements BaseEntity {
  // Type-hinting
  _id: Types.ObjectId
  id?: string
  __v: number
}

export interface BaseEntity {}