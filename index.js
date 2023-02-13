const app = require("./app"); // the actual Express application
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

// Stop MongoMemoryServer server when stop server in test mode
if (process.env.NODE_ENV === "test") {
  process.on("SIGTERM", async () => {
    await require("./connect").mongod.stop();
    debug("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      debug("HTTP server closed");
    });
  });
}
