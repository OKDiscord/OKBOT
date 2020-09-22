import { prop } from "@typegoose/typegoose"
import { Types } from "mongoose"

export class WarnProfile {
  // Type-hinting
  _id: Types.ObjectId
  id?: string
  __v: number

  @prop({ unique: true, required: true })
  userId!: string

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @prop({ required: true, default: 0 })
  warnings: number = 0
}
