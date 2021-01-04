import { pre, prop } from "@typegoose/typegoose"
import { Types } from "mongoose"
import * as argon2 from "argon2"
import { MongoEntity } from "../IEntity"

// Pre-hook for hashing the password
@pre<User>("save", async function (next) {
  this.password = await argon2.hash(this.password)
  next()
})
export class User extends MongoEntity {

  @prop({ unique: true, required: true })
  username!: string

  @prop({ required: true, default: 0 })
  password!: string

  @prop({ required: true, unique: true })
  discordId!: string

  @prop({ required: true })
  refreshToken!: string
}
