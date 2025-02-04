import cloudinary from "../config/cloudinary.config";
import CustomError from "../utils/customError";

const DEFAULT_IMAGES = [
   process.env.DEFAULT_AVATAR_MALE,
   process.env.DEFAULT_AVATAR_FEMALE,
];

const getPublicIdFromUrl = (url: string): string => {
   const regex = /\/upload\/(?:v\d+\/)?(.+)\./;
   const matches = url.match(regex);

   if (!matches?.[1])
      throw CustomError.create(
         "Invalid Cloudinary URL format",
         400,
         "BAD_REQUEST"
      );

   return matches[1];
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
   if (!imageUrl)
      throw CustomError.create("Image URL is required", 400, "BAD_REQUEST");

   if (DEFAULT_IMAGES.includes(imageUrl)) return;

   const publicId = getPublicIdFromUrl(imageUrl);
   await cloudinary.uploader.destroy(publicId);
};

export const deleteMultipleImages = async (urls: string[]): Promise<void> => {
   await Promise.all(urls.map((url) => deleteImage(url)));
};
