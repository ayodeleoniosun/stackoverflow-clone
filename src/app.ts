import express from "express";
import bodyParser from "body-parser";
import config from "config";
import "dotenv/config";

const app = express();

app.set("port", process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("*", (req, res) =>
  res.status(200).send({
    message: `Welcome to ${config.get("appName")}`,
  })
);

export default app;
