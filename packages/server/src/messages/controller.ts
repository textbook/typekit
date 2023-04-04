import { MessageDto } from "@typekit/shared";
import { Response, Router } from "express";

import { getAll, Message } from "./service";
import { methodNotAllowed } from "../utils/middleware";

const router = Router();

router
	.route("/")
	.get((_, res: Response<MessageDto[]>) => {
		res.json(getAll().map(toDto));
	})
	.all(methodNotAllowed());

const toDto = ({ content, created }: Message): MessageDto => ({
	content,
	created: created.toISOString(),
});

export default router;
