import fs from "fs";
import path from "path";

const DEFAULT_IMAGES = [
   "default-female-profile.jpg",
   "default-male-profile.jpg",
];

export const deleteImage = (filename: string): void => {
   // Don't delete if it's a default image
   if (!filename || DEFAULT_IMAGES.includes(filename)) return;

   const imagePath = path.join(__dirname, "../uploads", filename);

   if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
};

export const deleteMultipleImages = (filenames: string[]): void => {
   filenames.forEach((filename) => {
      deleteImage(filename);
   });
};
