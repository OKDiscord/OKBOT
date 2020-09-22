import { prop } from "@typegoose/typegoose"
import { Types } from "mongoose"

export class WarnProfile {
  // Type-hinting
  _id: Types.ObjectId
  id?: string
  __v: number

  @prop({ unique: true, required: true })
  userId!: string

  @prop({ required: true, default: 0 })
  warnings = 0
}
