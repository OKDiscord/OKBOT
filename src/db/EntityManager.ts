import { getModelForClass } from "@typegoose/typegoose"
import { DiscordUser as DBDiscordUser } from "./entity/DiscordUser"
import { User as DBUser } from "./entity/User"

export const WarnProfile = getModelForClass(DBDiscordUser)
export const User = getModelForClass(DBUser)
