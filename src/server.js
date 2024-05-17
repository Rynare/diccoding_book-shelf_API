import { server as _server } from "@hapi/hapi";
// eslint-disable-next-line import/named
import { routes } from "./routes.js";
import "dotenv/config";

const init = async () => {
  const server = _server({
    port: process.env.PORT,
    host: process.env.HOST,
  });

  server.route({
    method: "*",
    path: "/",
    handler: (request, h) => h.response({
      method: request.method,
      status: "active",
      lets_connected: {
        github: "https://github.com/Rynare",
        facebook: "https://www.facebook.com/fahimdb",
        instagram: "https://www.instagram.com/darkchocolates49",
      },
    }),
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
