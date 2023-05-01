import config from "config";
import helmet from "helmet";
import Debug from "debug";
import express from "express";
import bodyParser from "body-parser";
import routers from "./startup/routes";
const debug = Debug("app:startup");
const app = express();

console.log(config.get("name"));
const port = Number(process.env.PORT) || 6000;

app.use(helmet());
app.use(express.static("public"));

app.use(bodyParser.json());

app.listen(port, () => {
    debug("Application started");
    console.log(`Server started at http://localhost:${port}`);
    routers(app, port);
});

export default app;
