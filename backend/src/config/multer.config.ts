import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
import cloudinary from "./cloudinary.config";
import customError from "../utils/customError";

const FOLDERS = {
   AVATARS: "threads-app/avatars",
   THREAD_IMAGES: "threads-app/thread_images",
} as const;

type StorageConfig = {
   folder: string;
   transformation?: Array<Record<string, any>>;
   allowed_formats?: string[];
   maxFileSize?: number;
};

const STORAGE_CONFIG: Record<keyof typeof FOLDERS, StorageConfig> = {
   AVATARS: {
      folder: FOLDERS.AVATARS,
      transformation: [
         { width: 400, height: 400, crop: "fill", gravity: "face" },
         { quality: "auto", fetch_format: "auto" },
      ],
      maxFileSize: 1 * 1024 * 1024, // 1MB
   },
   THREAD_IMAGES: {
      folder: FOLDERS.THREAD_IMAGES,
      transformation: [
         { width: 1080, crop: "limit" }, // Max width of 1080px, maintain aspect ratio
         { quality: "auto", fetch_format: "auto" },
      ],
      maxFileSize: 5 * 1024 * 1024, // 5MB
   },
};

const createStorage = (config: StorageConfig) =>
   new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
         folder: config.folder,
         transformation: config.transformation,
         allowed_formats: config.allowed_formats,
      } as any,
   });

const fileFilter = (
   _req: Request,
   file: Express.Multer.File,
   cb: multer.FileFilterCallback
) => {
   const imageType = file.mimetype.split("/")[0];

   if (imageType !== "image")
      return cb(customError.create("You can only upload images", 400, "ERROR"));

   return cb(null, true);
};

// Create separate upload middlewares
export const uploadAvatar = multer({
   storage: createStorage(STORAGE_CONFIG.AVATARS),
   fileFilter,
   limits: { fileSize: STORAGE_CONFIG.AVATARS.maxFileSize },
});

export const uploadThreadImage = multer({
   storage: createStorage(STORAGE_CONFIG.THREAD_IMAGES),
   fileFilter,
   limits: { fileSize: STORAGE_CONFIG.THREAD_IMAGES.maxFileSize },
});
