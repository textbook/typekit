import express from "express";

import apiRouter from "./api";
import { HttpStatus } from "./utils/http";
import { methodNotAllowed } from "./utils/middleware";

const app = express();

app
	.route("/healthz")
	.get((_, res) => res.sendStatus(HttpStatus.OK))
	.all(methodNotAllowed());

app.use("/api", apiRouter);

export default app;
