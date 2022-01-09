import express from "express";
const dwpNodeLogger = require("@dwp/node-logger");
const config = require("config");
const app = express();
const logger = dwpNodeLogger("web", {
  logLevel: config.get("Logging.level"),
});
const { getPeopleInOrAroundLocation } = require("./helpers/utils");
app.use(logger.httpLogger);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Make your request to /users instead");
});

app.get("/users", async (req: express.Request, res: express.Response) => {
  const response: any = {
    header: {
      code: 200,
      message: "ok",
      numResults: 0,
    },
    data: {},
  };

  try {
    const people = await getPeopleInOrAroundLocation("London", 50);
    response.header.numResults = people.length;
    response.data = people;
    res.json(response);
  } catch (error) {
    response.header.code = 501;
    response.header.message =
      "A server side error occured, please try again later";
    logger.warn(error);
    res.json(response);
  }
});

app.listen(config.get("Service.port"), () => {
  logger.info(`API is listening on port ${config.get("Service.port")}`);
});
