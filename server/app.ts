import * as express from "express";
import * as bodyParser from "body-parser";
// import * as auth from "./routes/auth";
import authMiddleware from "./libs/auth/utils";
import errorHandler from "./libs/errors/errorMiddleware";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// unauthenticated routes
// app.use("/api/v1/oauth", auth);

// authenticated routes
app.use(authMiddleware);

app.use(errorHandler);

export = app;
