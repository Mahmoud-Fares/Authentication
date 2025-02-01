import express, { Router } from "express";
import { uploadAvatar } from "../config/multer.config";
import authController from "../controllers/auth.controller";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router
   .route("/signup")
   .post(uploadAvatar.single("avatar"), authController.register);
router.route("/login").post(authController.login);
router.route("/refresh").get(authController.refresh);
router.route("/logout").get(authController.logout);
router.route("/me").get(auth, authController.me);

export default router;
