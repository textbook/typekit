import { Router } from "express";

import messagesRouter from "./messages";

const router = Router();

router.use("/messages", messagesRouter);

export default router;
