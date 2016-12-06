import * as express from "express";
import * as bodyParser from "body-parser";
import * as survey from "./routes/survey";
import authMiddleware from "./libs/auth/middleware";
import errorHandler from "./libs/errors/middleware";
import * as auth from "./routes/auth";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/v1/auth", auth);
app.use("/api/v1/survey", survey);

app.use(errorHandler);

export = app;
