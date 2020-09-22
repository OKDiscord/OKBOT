import { getModelForClass } from "@typegoose/typegoose"
import { WarnProfile as DBWarnProfile } from "./entity/WarnProfile"

export const WarnProfile = getModelForClass(DBWarnProfile)
