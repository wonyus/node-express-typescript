import express, { Express, Request, Response } from "express";
import router from "./src/routes";
import cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import { server_port } from "./src/configs/constant";
import { APILogger } from "./src/logger/api.loggers";
import { sync } from "./src/model";
import passport from "passport";
import expresssession from "express-session";
import PassportJwt from "./src/middleware/passport";

import { createServer } from "http";
import { Server } from "socket.io";

const morgan = require("morgan");
const app: Express = express();
export const logger = new APILogger();
const WsServer = createServer(app);
const io = new Server(WsServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(expresssession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

io.engine.use((req: Request, res: Response, next: () => void) => {
  next();
});

io.engine.use(expresssession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
io.engine.use(passport.initialize());
io.engine.use(passport.session());
io.engine.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
PassportJwt(passport);

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

sync({ alter: true }).then(() => {
  const server = app.listen(server_port, () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `${addr?.port}`;
    logger.info(`⚡️[server]: Server is running at http://localhost:${bind}`);
  });
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    logger.info("message: " + msg);
    io.emit("message", msg);
  });
});

WsServer.listen(process.env.SERVER_WS_PORT, () => {
  logger.info("Socket server is running at http://localhost:" + process.env.SERVER_WS_PORT);
});
