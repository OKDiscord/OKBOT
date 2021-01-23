import { makeCommand } from "../../hooks/commands"
import { shiftMany } from "../../utils/arrayUtils"
import { sendPoll } from "../../hooks/polls/sendPoll"

export default makeCommand({
  name: "poll",
  description: "Hlasování",
  run: async (message, { args }) => {
    const channel = message.mentions.channels.first()
    if (!channel) return // embed not specified channel

    const [question, answersString] = shiftMany(args, 1).join(" ").split("|")

    if (!question || !answersString) return // embed invalid usage

    const answers = answersString.split(" ").filter((el) => el && el !== "")
    if (answers.length > 10) return // embed no more than 10

    return await sendPoll(channel, question, answers)
  },
})
