import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";

import apiRouter from "./api";
import { HttpStatus } from "./utils/http";
import {
	clientRouter,
	logErrors,
	logRequests,
	methodNotAllowed,
} from "./utils/middleware";

const app = express();

const apiRoot = "/api";

app.use(logRequests());

app
	.route("/healthz")
	.get((_, res) => res.sendStatus(HttpStatus.OK))
	.all(methodNotAllowed());

app.use(clientRouter(dirname(fileURLToPath(import.meta.url)), apiRoot));

app.use(apiRoot, apiRouter);

app.use(logErrors());

export default app;
