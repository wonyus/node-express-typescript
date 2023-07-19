import express, { Express, Request, Response } from "express";
import router from "./src/routes";
import * as swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import { server_port } from "./src/configs/constant";
import { APILogger } from "./src/logger/api.loggers";
import { sync } from "./src/model";

const app: Express = express();
const logger = new APILogger();

const swaggerFile: any = process.cwd() + "/src/swagger/swagger.json";
const swaggerData: any = fs.readFileSync(swaggerFile, "utf8");
const customCss: any = fs.readFileSync(process.cwd() + "/src/swagger/swagger.css", "utf8");
const swaggerDocument = JSON.parse(swaggerData);

app.use(router);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// swagger docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, undefined, undefined, customCss));

// handle undefined routes
app.use("*", (req, res, next) => {
  res.send("Make sure url is correct!!!");
});

sync().then(() => {
  const server = app.listen(server_port, () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `${addr?.port}`;
    logger.info(`⚡️[server]: Server is running at http://localhost:${bind}`, null);
  });
});
