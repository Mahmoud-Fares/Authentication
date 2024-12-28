import express, { Router } from "express";
import authController from "../controllers/auth.controller";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.route("/signup").post(authController.register);
router.route("/login").post(authController.login);
router.route("/refresh").get(auth, authController.refresh);
router.route("/logout").get(authController.logout);

export default router;
