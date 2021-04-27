require("dotenv").config();

import app from "./app";
import config from "config";

app.listen(config.get("port"), config.get("host"), () => {
  console.log(
    `${config.get("appName")} is currently running on port ${config.get(
      "port"
    )}`
  );
});
