import { UserInputError } from "@fasteerjs/exceptions";
import { Controller } from "../../types";
import { Auth } from "../schemas";
import { hashes } from "@okbot/core/src";

const AuthController: Controller = async (fastify, { db }) => {
  fastify.post<Auth.LoginSchema>(
    "/login",
    { schema: Auth.loginSchema },
    async ({ body: { username, password }, session }, res) => {
      const user = await db.user.findUnique({
        where: {
          username,
        },
      });

      if (!user || !hashes.compareHash(password, user.password))
        throw new UserInputError("Incorrect username and/or password.");

      session.set("userId", user.id);

      res.send(res.ok({ message: "Authenticated." }));
    }
  );
};

export const routePrefix = "/auth";

export default AuthController;
