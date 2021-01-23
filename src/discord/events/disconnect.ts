import { logger } from "../../Main"
import { makeEvent } from "../../hooks/events"

export default makeEvent({
  listensTo: "disconnect",
  run: () => {
    return logger.error("got disconnected from discord.")
  },
})
