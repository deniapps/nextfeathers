/* eslint-disable no-console */
const logger = require("./logger");
const app = require("./app");
const port = app.get("port");
// const server = app.listen(port);

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

app
  .listen(port)
  .then(() => console.log("Feathers server listening on localhost:3030"));

// server.on('listening', () =>
//   logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
// );
