import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import logger from "./shared/Logger";
import { StatusCodes } from "http-status-codes";
import express, { NextFunction, Request, Response } from "express";
import productRouter from "./routes/products";
// import { notfound } from './routes/404/index';
// import { root } from './routes/';

dotenv.config();

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', root);
// app.use('*', notfound);
app.use("/api", productRouter);

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

app.get("/", (req: Request, res: Response) => {
  res.sendFile("home.html", { root: viewsDir });
});

export default app;
