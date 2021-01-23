/* eslint-disable no-console */
import { Main } from "../../Main"
import { makeCommand } from "../../types/Command"

/**
 *
 * This command is dedicated to reacting with the server
 * in development environment (NODE_ENV=development).
 * It doesn't work in production environment (NODE_ENV=production)!
 *
 * DO NOT RUN THIS COMMAND IN PRODUCTION UNLESS YOU KNOW WHAT YOU'RE DOING.
 *
 */
export default makeCommand({
  name: "test",
  description: "Testovací příkaz. Funguje jen v dev environmentu.",
  run: async (message) => {
    const canRun = [
      "464857021603250197", // simir
      "630439552389218313", // vottus
    ]
    if (Main.env() === "development" && canRun.includes(message.author.id)) {
      /**
       * This test is supposed to prepare the channel
       * for testing the clear command.
       */
      const clearTestSpamMessages = async (howManyTimes) => {
        console.log(
          `TEST COMMAND | clearTestSpamMessage(howManyTimes=${howManyTimes}) invoked.`
        )
        for (let i = 0; i < howManyTimes; i++) {
          await message.channel.send(i)
        }
        console.log(
          `TEST COMMAND | clearTestSpamMessage(howManyTimes=${howManyTimes}) finished..`
        )
      }

      await clearTestSpamMessages(250)
    }
  },
})
