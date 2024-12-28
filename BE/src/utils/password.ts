import bcrypt from "bcryptjs";
import customError from "./customError";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
   if (!password)
      throw customError.create("Password is required", 400, "VALIDATION_ERROR");

   try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      if (!hashedPassword)
         throw customError.create("Error hashing password", 500, "ERROR");

      return hashedPassword;
   } catch (error) {
      throw customError.create("Error hashing password", 500, "ERROR");
   }
};

export const verifyPassword = async (
   plainPassword: string,
   hashedPassword: string
): Promise<boolean> => {
   if (!plainPassword || !hashedPassword) {
      throw customError.create(
         "Password comparison failed",
         400,
         "VALIDATION_ERROR"
      );
   }

   const isValid = await bcrypt.compare(plainPassword, hashedPassword);

   if (!isValid)
      throw customError.create("Invalid password", 401, "UNAUTHORIZED");

   return isValid;
};
