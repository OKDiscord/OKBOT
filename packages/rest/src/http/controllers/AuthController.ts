import { Fasteer as F } from "@fasteerjs/fasteer";
import { Auth } from "../schemas";
import { FCtx } from "../..";

const AuthController: F.FCtrl = async (fastify, { ctx: { db } }: FCtx) => {
  fastify.post<Auth.LoginSchema>(
    "/login",
    { schema: Auth.loginSchema },
    async ({ body: { username, password } }, res) => {
      // const user = U;
    }
  );

  fastify.post<Auth.DiscordAuthSchema>(
    "/discord-authorize",
    { schema: Auth.discordAuthSchema },
    async (req, res) => {}
  );
};

export const routePrefix = "/auth";

export default AuthController;
