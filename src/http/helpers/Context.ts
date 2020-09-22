import { FastifyRequest } from "fastify"
import { User as DBUser } from "../../db/entity/User"
import { User } from "../../db/EntityManager"
import Jwt from "./Jwt"

export type RequestContext = {
  authenticated: boolean
  user: DBUser | null
}

const Context = async (req: FastifyRequest) => {
  const defaultContext: RequestContext = { authenticated: false, user: null }

  const auth = req.headers["authorization"]
  if (!auth || !String(auth).startsWith("Bearer ")) return defaultContext

  const payload = Jwt.getPayload(String(auth).replace("Bearer ", ""))
  if (!payload) return defaultContext

  const user = await User.findById(payload.userId)
  if (!user) return defaultContext

  return { authenticated: true, user }
}

export default Context
