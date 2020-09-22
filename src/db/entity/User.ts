import { pre, prop } from "@typegoose/typegoose"
import { Types } from "mongoose"
import * as argon2 from "argon2"

// Pre-hook for hashing the password
@pre<User>("save", async function (next) {
  this.password = await argon2.hash(this.password)
  next()
})
export class User {
  // Type-hinting
  _id: Types.ObjectId
  id?: string
  __v: number

  @prop({ unique: true, required: true })
  username!: string

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @prop({ required: true, default: 0 })
  password!: string

  @prop({ required: true, unique: true })
  discordId!: string
}
