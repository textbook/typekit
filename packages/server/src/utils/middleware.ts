import { join } from "node:path";

import express, { type RequestHandler, Router } from "express";

import { HttpStatus } from "./http";

export const clientRouter = (baseDir: string, apiRoot: string): Router => {
	const router = Router();
	router.use(express.static(join(baseDir, "static")));
	router.get("*", (req, res, next) => {
		if (!req.path.startsWith(apiRoot)) {
			return res.sendFile(join(baseDir, "static", "index.html"));
		}
		next();
	});
	return router;
};

export const methodNotAllowed = (): RequestHandler => (_, res) =>
	res.sendStatus(HttpStatus.METHOD_NOT_ALLOWED);
