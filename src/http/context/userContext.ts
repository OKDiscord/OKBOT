import { FastifyReply, FastifyRequest } from "fastify"
import { User as DBUser } from "../../db/entity/User"
import { User } from "../../db/EntityManager"
import Jwt from "../helpers/jwt"

export type RequestContext = {
  authenticated: boolean
  user: DBUser | null
}

export const useUserContext = async (req: FastifyRequest) => {
  const defaultContext: RequestContext = { authenticated: false, user: null }

  const auth = req.headers["authorization"]
  if (!auth || !String(auth).startsWith("Bearer ")) return defaultContext

  const payload = Jwt.getPayload(String(auth).replace("Bearer ", ""))
  if (!payload) return defaultContext

  const user = await User.findById(payload.userId)
  if (!user) return defaultContext

  return { authenticated: true, user }
}

export const withUserContext = async (
  req: FastifyRequest,
  res: FastifyReply,
  fn: (req: FastifyRequest, res: FastifyReply) => Promise<unknown>
) => {
  const ctx = await useUserContext(req)
  if (!ctx.authenticated)
    return await res.send({
      success: false,
      errors: {
        kind: "UNAUTHORIZED",
        message: "Not authenticated",
      },
    })

  return await fn(req, res)
}
