import { Types } from "mongoose"

export abstract class MongoEntity implements BaseEntity {
  // Type-hinting
  _id: Types.ObjectId
  id?: string
  __v: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntity {}
