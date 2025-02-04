export const API_URL =
   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const AXIOS_CONFIG = {
   baseURL: API_URL,
   withCredentials: true,
   headers: {
      "Content-Type": "application/json",
   },
};
