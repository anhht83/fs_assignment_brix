import express, { Application } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import compress from "compression";
import methodOverride from "method-override";
import cors from "cors";
import helmet from "helmet";
import routes from "../routes";
import error from "../middlewares/error.middleware";

import vars  from "./vars";
/**
 * Express instance
 * @public
 */
const app: Application = express();
app.set("trust proxy", 1);
// enable CORS - Cross Origin Resource Sharing
app.use(
  cors({
    origin: "*",
    allowedHeaders: "*"
  })
);
// request logging. dev: console | production: file
app.use(morgan(vars.logs));

// parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// Function to serve all static files
// inside public directory.
app.use("", express.static(`${__dirname}/../public`));

// mount api routes
app.use("/", routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
