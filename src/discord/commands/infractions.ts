import { Command } from "../../Main"
import { getMongoManager } from "typeorm"
import { WarnProfile } from "../../db/entity/WarnProfile"
class Infractions {
  constructor() {
    return {
      name: "infractions",
      description: [
        "Infractions umožňuje moderátorům zjišťovat varování daných uživatelů.",
        "Použití: infractions <uživatel>.",
      ],
      run: async (message) => {
        if (message.mentions.members.size == 0)
          return await message.reply("nevím, koho mám zobrazit!")
        const warnProfile = getMongoManager().getMongoRepository(WarnProfile)
        const isThere = await warnProfile.findOne({
          where: { userId: message.mentions.members.first().id },
        })
        if (isThere) {
          return await message.channel.send(
            `Tento uživatel má ${isThere.warnings} varování.`
          )
        }
        message.channel.send("Tento uživatel má 0 varování.")
      },
    } as Command
  }
}

export default Infractions
