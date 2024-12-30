import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
import cloudinary from "./cloudinary.config";
import customError from "../utils/customError";

const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      folder: "threads-app",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
   } as any,
});

const fileFilter = (
   _req: Request,
   file: Express.Multer.File,
   cb: multer.FileFilterCallback
) => {
   const imageType = file.mimetype.split("/")[0];

   if (imageType === "image") {
      return cb(null, true);
   } else {
      return cb(customError.create("You can only upload images", 400, "ERROR"));
   }
};

export const upload = multer({
   storage,
   fileFilter,
});
