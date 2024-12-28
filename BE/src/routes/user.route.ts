import express, { Router } from "express";

import userController from "../controllers/user.controller";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.route("/").get(auth, userController.getUsers);

export default router;
