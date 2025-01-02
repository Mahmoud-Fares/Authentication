import express, { Router } from "express";
import userRouter from "./user.route";
import threadRouter from "./thread.route";
import authRouter from "./auth.route";
import googleRouter from "./google.route";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/auth/google", googleRouter);

router.use("/users", userRouter);
router.use("/threads", threadRouter);

export default router;
