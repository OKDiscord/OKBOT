import { makeCommand } from "../../hooks/commands"
import { DiscordUser } from "../../db/EntityManager"

export default makeCommand({
  name: "infractions",
  description: [
    "Infractions umožňuje moderátorům zjišťovat varování daných uživatelů.",
    "Použití: infractions <uživatel>.",
  ],
  run: async (message) => {
    if (message.mentions.members.size == 0)
      return await message.reply("nevím, koho mám zobrazit!")

    const isThere = await DiscordUser.findOne({
      discordId: message.mentions.members.first().id,
    })

    const warns = isThere.punishments.filter((el) => el.kind === "warn")

    if (isThere) {
      return await message.channel.send(
        `Tento uživatel má ${warns.length} varování.`
      )
    }

    message.channel.send("Tento uživatel má 0 varování.")
  },
})
