import { ClientEvents } from "discord.js"
import { Context } from "./Context"

export interface EventContext<K extends keyof ClientEvents> extends Context {
  eventName: K
  args: ClientEvents[K]
}

export interface Event<K extends keyof ClientEvents> {
  listensTo: K
  run: (context: EventContext<K>) => unknown
}

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
