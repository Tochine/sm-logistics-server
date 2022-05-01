const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("./config");
const { routesLogger } = require("./logger");
const { PRODUCTION } = require("./constants");

const {
  errorHandler,
  pageNotFound,
  logVisited,
} = require("./middlewares/error.handler");

// create the server
const app = express();

app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "static")));

if (config.app.env !== PRODUCTION) app.use(logVisited);

const stream = {
  write: (text) => routesLogger.http(text.trim()),
};

app.use(morgan(config.app.env === "local" ? "dev" : "combined", { stream }));
app.use(logVisited);

/* ROUTES */
// app.use("/auth", require("./routes/auth"));
app.use("/api/v1", require("./routes"));
// app.use("/riders", require("./routes/riders"));
// app.use("/admin", require("./routes/admins"));

/* EXCEPTION HANDLERS */
app.use(errorHandler);
app.use(pageNotFound);

module.exports = app;
