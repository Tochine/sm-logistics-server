const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config(path.join(__dirname, "../../.env"));
const config = require("../config");

const { generalLogger, errorLogger } = require("../logger");

const dbUri = process.env.DB_URI
  || `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

const connect = async () => {
  await mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      generalLogger.info(`mongodb connected:: @${conn.connection.host}`);
    })
    .catch((err) => {
      errorLogger.info("mongodb failed to connect", err);
      process.exit(1);
    });
};

module.exports = { connect, dbUri };
