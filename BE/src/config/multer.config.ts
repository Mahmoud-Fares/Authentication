import multer from "multer";
import { Request } from "express";
import customError from "../utils/customError";

const diskStorage = multer.diskStorage({
   destination: function (
      _req: Request,
      _file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
   ) {
      cb(null, "src/uploads");
   },
   filename: function (
      _req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
   ) {
      const ext = file.mimetype.split("/")[1];
      const fileName = `img-${Date.now()}.${ext}`;
      cb(null, fileName);
   },
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
   storage: diskStorage,
   fileFilter: fileFilter,
});
