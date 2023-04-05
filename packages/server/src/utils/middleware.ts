import { join } from "node:path";

import express, {
	type ErrorRequestHandler,
	type RequestHandler,
	Router,
} from "express";
import morgan from "morgan";

import { HttpStatus } from "./http";
import logger from "./logger";

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

export const httpsOnly = (): RequestHandler => (req, res, next) => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

export const logErrors = (): ErrorRequestHandler => (err, req, res, next) => {
	if (!res.headersSent) {
		logger.error(err);
		res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	next(err);
};

export const logRequests = (): RequestHandler =>
	morgan("dev", {
		stream: {
			write(message: string): void {
				logger.info(message.trim());
			},
		},
	});

export const methodNotAllowed = (): RequestHandler => (_, res) =>
	res.sendStatus(HttpStatus.METHOD_NOT_ALLOWED);
