import express, { Router } from "express";
import threadController from "../controllers/thread.controller";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.route("/").post(auth, threadController.createThreadController);

export default router;
