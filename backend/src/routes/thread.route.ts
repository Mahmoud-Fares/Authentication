import express, { Router } from "express";
import threadController from "../controllers/thread.controller";
import { auth } from "../middleware/auth";
import { uploadThreadImage } from "../config/multer.config";

const router: Router = express.Router();

router
   .route("/")
   .post(
      auth,
      uploadThreadImage.array("images", 10),
      threadController.createThreadController
   );

export default router;
