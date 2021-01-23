import { ClientEvents } from "discord.js"
import { Event } from "../../types"

export const makeEvent = <E extends keyof ClientEvents>({
  listensTo,
  run,
}: {
  listensTo: E
  run: Event<E>["run"]
}) =>
  ({
    listensTo,
    run,
  } as Event<E>)
