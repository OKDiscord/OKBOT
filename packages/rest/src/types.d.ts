import { PrismaClient } from "@prisma/client";
import { Client as DiscordClient } from "discord.js";
import { Fasteer } from "@fasteerjs/fasteer";
import { FastifyInstance } from "fastify";

interface Injected {
  db: PrismaClient;
  dev: boolean;
  discord: DiscordClient;
}

interface BaseError {
  kind: string;
  message: string;
}

interface SuccessResponse<TData extends object = object> {
  success: true;
  data: TData;
}

interface ErrorResponse {
  success: false;
  error: BaseError;
}

declare module "fastify" {
  interface FastifyReply {
    ok: <TData extends object = object>(
      response: TData
    ) => SuccessResponse<TData>;
    err: (error: BaseError) => ErrorResponse;
  }
}

type Controller = Fasteer.FCtrl<FastifyInstance, {}, Injected>;

export { Injected, Controller, BaseError, SuccessResponse, ErrorResponse };
