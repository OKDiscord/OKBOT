import { getModelForClass } from "@typegoose/typegoose"
import { DiscordUser as DBDiscordUser } from "./entity/DiscordUser"
import { User as DBUser } from "./entity/User"

export const DiscordUser = getModelForClass(DBDiscordUser)
export const User = getModelForClass(DBUser)

export class DiscordUserRepo {
  static findDiscordUserOrCreate = async (discordId: string) => {
    const discordUser = await DiscordUser.findOne({
      where: { discordId },
    })
    if (!discordUser)
      return await DiscordUser.create({
        discordId,
        punishments: [],
      })

    return discordUser
  }
}
