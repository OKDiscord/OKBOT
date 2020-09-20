import { Command } from "../../types/Command"
import { shiftMany } from "../../utils/ArrayUtils"
import { createWithFields } from "../../utils/EmbedUtils"
import { sendPoll } from "../../common/sendPoll"

class Poll {
  constructor() {
    return {
      name: "poll",
      description: "Hlasování",
      run: async (message, { args }) => {
        const channel = message.mentions.channels.first()
        if (!channel) return // embed not specified channel

        const [question, answersString] = shiftMany(args, 1)
          .join(" ")
          .split("|")

        if (!question || !answersString) return // embed invalid usage

        const answers = answersString.split(" ").filter((el) => el && el !== "")
        if (answers.length > 10) return // embed no more than 10

        return await sendPoll(channel, question, answers)
      },
    } as Command
  }
}

export default Poll
