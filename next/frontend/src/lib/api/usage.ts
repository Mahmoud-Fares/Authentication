import { clientAxios } from "@/lib/axios/axios-client";

export type LoginCredentials = {
   email: string;
   password: string;
};

// Test endpoints
// public
export const publicRoute = async () => {
   const response = await clientAxios.get("/api/public");
   return response.data;
};

// protected
export const protectedRoute = async () => {
   const response = await clientAxios.get("/api/protected");
   return response.data;
};

// Auth endpoints
export const login = async (credentials: LoginCredentials) => {
   const response = await clientAxios.post("/api/auth/login", credentials);
   return response.data;
};

export const logout = async () => {
   const response = await clientAxios.get("/api/auth/logout");
   return response.data;
};

export const refresh = async () => {
   const response = await clientAxios.get("/api/auth/refresh");
   return response.data;
};

export const me = async () => {
   const response = await clientAxios.get("/api/auth/me");
   return response.data;
};

// Protected endpoints
export const getUsers = async () => {
   const response = await clientAxios.get("/api/users");
   return response.data;
};
