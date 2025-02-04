import { Request } from "express";
import { IUser } from "models/user.model";

export type TokenPayload = {
   userId: string;
   email: string;
};

export type AuthRequest = Request & {
   currentUserPayload?: TokenPayload;
};

export type OAuthRequest = Request & {
   user?: IUser;
};
