import { UserInputError } from "@fasteerjs/exceptions";
import { Controller } from "../../types";
import { Poll } from "../schemas";
import { sendPoll } from "@okbot/core/src/hooks/polls/sendPoll";
import { TextChannel } from "discord.js";

const PollController: Controller = async (fastify, { discord }) => {
  fastify.post<Poll.PollSchema>(
    "/create",
    { schema: Poll.pollSchema },
    async ({ body: { channelId, question, answers }, session }, res) => {
      if (!answers.every((val) => typeof val === "string"))
        throw new UserInputError("Answers must only be strings.");

      const channel = await discord.channels.fetch(channelId);

      if (!channel || !(channel instanceof TextChannel))
        throw new UserInputError(
          "Channel doesn't exist or is not a text channel."
        );

      await sendPoll(channel, question, answers);

      res.send(res.ok({ message: "Poll created." }));
    }
  );
};

export const routePrefix = "/poll";

export default PollController;
