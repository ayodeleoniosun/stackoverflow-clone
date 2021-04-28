import express from "express";
import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import fs from "fs";
import "dotenv/config";
import { dasherizeCamelCase } from "./helpers/tools";

const app = express();

app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// auto load API routes here
fs.readdirSync(`${__dirname}/routes/`).forEach((file) => {
  const namespace = file.split(".")[0];
  const routes = require(`./routes/${file}`).default;
  app.use(`/api/${dasherizeCamelCase(namespace)}`, routes);
});

app.get("*", (req, res) =>
  res.status(200).send({
    message: `Welcome to ${config.get("appName")}`,
  })
);

export default app;
