import { TextChannel } from "discord.js"
import { createDefault } from "../utils/EmbedUtils"
import NumberEmotes from "../misc/NumberEmotes"

export const sendPoll = async (
  channel: TextChannel,
  question: string,
  answers: string[]
) => {
  let answerString = ""
  const emotes = [] as string[]

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i]
    const emote = NumberEmotes[i.toString()]
    answerString += `${i === 0 ? "" : ","} ${emote} - ${answer}`
    emotes.push(emote)
  }

  const embed = createDefault().setTitle("Hlasování")
  embed.addFields([
    { name: question, value: "@everyone" },
    { name: "Odpovědi", value: answerString },
  ])

  const message = await channel.send(embed)
  await emotes.forEach(async (emote) => await message.react(emote))
}
