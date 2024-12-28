import { Request } from "express";

export type TokenPayload = {
   userId: string;
   email: string;
};

export type AuthRequest = Request & {
   currentUserPayload?: TokenPayload;
};
