const dotenv = require("dotenv");

const path = require("path");

dotenv.config(path.join(__dirname, "../.env"));

const app = require("./app");

const config = require("./config");
const { generalLogger } = require("./logger");

require("./database/connection")
  .connect()
  .then(() => {
    app.listen(config.app.port, () => {
      generalLogger.info(`SERVER STARTED ::: PORT=${config.app.port}`);
    });
  });
