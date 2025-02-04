import User, { IUser } from "../models/user.model";
import { TokenPayload } from "../types/auth.types";
import customError from "../utils/customError";
import { hashPassword, verifyPassword } from "../utils/password";
import { generateTokenPair, verifyToken } from "./token.service";

export type RegisterData = {
   email: string;
   password: string;
   name: string;
};

export type LoginData = {
   email: string;
   password: string;
};

export type TokenPair = {
   accessToken: string;
   refreshToken: string;
};

export type AuthResponse = {
   user: Partial<IUser>;
   tokens: TokenPair;
};

export const register = async ({
   data,
   avatar,
}: {
   data: RegisterData;
   avatar?: string;
}): Promise<AuthResponse> => {
   const existingUser = await User.findOne({ email: data.email });
   if (existingUser)
      throw customError.create("Email already registered", 409, "CONFLICT");

   const hashedPassword = await hashPassword(data.password);

   const newUser = await User.create({
      ...data,
      password: hashedPassword,
      avatar,
   });

   const tokenPayload: TokenPayload = {
      userId: (newUser._id as unknown as string).toString(),
      email: newUser.email,
   };

   const tokens = generateTokenPair(tokenPayload);

   // Remove password from response
   const { password: _, ...userWithoutPassword } = newUser.toObject();

   return { user: userWithoutPassword, tokens };
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
   if (!data.email || !data.password)
      throw customError.create(
         "Email and password are required",
         400,
         "BAD_REQUEST"
      );

   const user = await User.findOne({ email: data.email });
   if (!user)
      throw customError.create("Invalid credentials", 401, "UNAUTHORIZED");

   // Check if user is Google OAuth user
   // Todo: we may need to redirect to Google OAuth login page
   if (user.googleId && !user.password)
      throw customError.create("Please login with Google", 400, "BAD_REQUEST");

   // Todo:if we implemented the redirect, remove this check either
   if (!user.password)
      throw customError.create("Invalid credentials", 401, "UNAUTHORIZED");

   const isPasswordValid = await verifyPassword(data.password, user.password);
   if (!isPasswordValid)
      throw customError.create("Invalid credentials", 401, "UNAUTHORIZED");

   // logged in successfully
   const tokenPayload: TokenPayload = {
      userId: (user._id as unknown as string).toString(),
      email: user.email,
   };

   const tokens = generateTokenPair(tokenPayload);

   // Remove password from response
   const { password: _, ...userWithoutPassword } = user.toObject();

   return { user: userWithoutPassword, tokens };
};

export const refresh = async (
   refreshToken: string
): Promise<{ tokens: TokenPair }> => {
   const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

   const user = await User.findById(payload.userId).select("-password");
   if (!user) throw customError.create("User not found", 404, "NOT_FOUND");

   const tokens = generateTokenPair({
      userId: payload.userId,
      email: payload.email,
   });

   return { tokens };
};

export const me = async (userId: string) => {
   const user = await User.findById(userId).select("-password");
   return user;
};
