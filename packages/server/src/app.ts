import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";

import apiRouter from "./api";
import { HttpStatus } from "./utils/http";
import { clientRouter, methodNotAllowed } from "./utils/middleware";

const app = express();

const apiRoot = "/api";

app
	.route("/healthz")
	.get((_, res) => res.sendStatus(HttpStatus.OK))
	.all(methodNotAllowed());

app.use(clientRouter(dirname(fileURLToPath(import.meta.url)), apiRoot));

app.use(apiRoot, apiRouter);

export default app;
