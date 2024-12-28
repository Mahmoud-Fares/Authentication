import express, { Router } from "express";
import userRouter from "./user.route";
import threadRouter from "./thread.route";

const router: Router = express.Router();

router.use("/users", userRouter);
router.use("/threads", threadRouter);

export default router;
