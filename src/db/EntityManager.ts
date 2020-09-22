import { getModelForClass } from "@typegoose/typegoose"
import { WarnProfile as DBWarnProfile } from "./entity/WarnProfile"
import { User as DBUser } from "./entity/User"

export const WarnProfile = getModelForClass(DBWarnProfile)
export const User = getModelForClass(DBUser)
