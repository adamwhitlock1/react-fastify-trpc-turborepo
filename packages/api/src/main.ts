import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import cors from "@fastify/cors";

import fastifyAuth0 from "fastify-auth0-verify";

import { createContext } from "./context";
import { appRouter } from "./router";

const app = fastify({ maxParamLength: 5000, logger: true });

app.register(cors, { origin: "*" });

app.register(fastifyAuth0, {
  domain: "dev-jiohplcg.auth0.com",
  audience: "https://snipe.sh",
  secret: "US8AKhdiCzcfaTR7VfKJmL-UYeRHhQbwbQAXm62kQ0xnQSX-yuWoLKOH85z07sA-",
});

app.register(function (instance, _options, done) {
  instance.get("/verify", {
    handler: function (request, reply) {
      reply.send(request.user);
    },
    preValidation: instance.authenticate,
  });
  done();
});

app.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await app.listen({ port: 3333 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
