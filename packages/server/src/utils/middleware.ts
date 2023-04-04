import { RequestHandler } from "express";

import { HttpStatus } from "./http";

export const methodNotAllowed = (): RequestHandler => (_, res) =>
	res.sendStatus(HttpStatus.METHOD_NOT_ALLOWED);
