import { Command } from "../../types/Command"
class Say {
  constructor() {
    return {
      name: "say",
      description: [
        "Say umožňuje oficiálnější sdělování zpráv.",
        "Jen pro moderátory!",
        "Použití: say <kanál> <obsah>.",
      ],
      run: async (message, { args }) => {
        if (!message.member.hasPermission("KICK_MEMBERS"))
          return await message.reply("nemáš povolení na tento příkaz!")
        if (!args) return await message.reply("nemám co říct!")
        if (message.mentions.channels.size == 0)
          return await message.reply("nezmínil jsi kanál!")
        args.shift()
        message.mentions.channels.first().send(args.join(" "))
      },
    } as Command
  }
}

export default Say
