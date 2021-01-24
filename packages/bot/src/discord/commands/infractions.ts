import { makeCommand } from "../../hooks/commands"

export default makeCommand({
  name: "infractions",
  description: [
    "Infractions umožňuje moderátorům zjišťovat varování daných uživatelů.",
    "Použití: infractions <uživatel>.",
  ],
  run: async (message, { db }) => {
    if (message.mentions.members.size == 0)
      return await message.reply("nevím, koho mám zobrazit!")

    const warns = await db.punishment.count({
      where: {
        punished: message.mentions.members.first().id,
        reason: "warn",
      },
    })

    message.channel.send(`Tento uživatel má ${warns} varování.`)
  },
})
