import { prop } from "@typegoose/typegoose"
import { MongoEntity } from "../IEntity"

export class WarnProfile extends MongoEntity {
  @prop({ unique: true, required: true })
  userId!: string

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @prop({ required: true, default: 0 })
  warnings: number = 0
}
