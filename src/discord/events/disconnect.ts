import { logger } from "../../Main"
import { Event } from "../../types/Event"

class Disconnect {
  constructor() {
    return {
      listensTo: "disconnect",
      run: () => {
        return logger.error("got disconnected from discord.")
      },
    } as Event<"disconnect">
  }
}

export default Disconnect
