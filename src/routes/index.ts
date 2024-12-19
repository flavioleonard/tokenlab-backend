import { Router } from "express";
import userRouter from "./user.routes"
import eventRouter from "./events.routes";

const router = Router();

router.use(userRouter);
router.use(eventRouter);

export default router;