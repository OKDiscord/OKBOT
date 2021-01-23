import config from "../../../config"
import { Types } from "mongoose"

import * as jwt from "jsonwebtoken"

export type JwtPayload = {
  userId: Types.ObjectId
}

export class Jwt {
  static sign(payload: JwtPayload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: "14d" })
  }

  static isValid(token: string) {
    try {
      return Boolean(jwt.verify(token, config.jwtSecret))
    } catch (e) {
      return false
    }
  }

  static getPayload(token: string): JwtPayload | null {
    if (token.includes("Bearer")) token = token.replace("Bearer ", "")
    try {
      return jwt.verify(token, config.jwtSecret) as JwtPayload
    } catch (e) {
      return null
    }
  }
}

export default Jwt
