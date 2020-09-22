import { Command } from "../../types/Command"
import { WarnProfile } from "../../db/EntityManager"
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
        const isThere = await WarnProfile.findOne({
          userId: message.mentions.members.first().id,
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
