import express, { Express, Request, Response } from "express";
import router from "./src/routes";
import * as swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import { server_port } from "./src/configs/constant";
import { APILogger } from "./src/logger/api.loggers";
import { sync } from "./src/model";
import passport from "passport";
import expresssession from "express-session";
import PassportJwt from "./src/middleware/passport";

const morgan = require("morgan");
const app: Express = express();
const logger = new APILogger();

app.use(expresssession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
PassportJwt(passport);

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.route("/health").get((req: Request, res: Response) => {
  res.status(200).json({ message: "success" });
});
app.use(`/v${process.env.VERSION}`, router);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// swagger docs
if (process.env.NODE_ENV != "production") {
  const swaggerFile: any = process.cwd() + "/src/swagger/swagger.json";
  const swaggerData: any = fs.readFileSync(swaggerFile, "utf8");
  const customCss: any = fs.readFileSync(process.cwd() + "/src/swagger/swagger.css", "utf8");
  const swaggerDocument = JSON.parse(swaggerData);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, undefined, undefined, customCss));
}

// handle undefined routes
app.use("*", (_, res, next) => {
  res.send("Make sure url is correct!!!");
});

sync({}).then(() => {
  const server = app.listen(server_port, () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `${addr?.port}`;
    logger.info(`⚡️[server]: Server is running at http://localhost:${bind}`);
  });
});
