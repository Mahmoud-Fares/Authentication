import axios from "axios";

export const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   withCredentials: true,
});

export async function apiPost<T>(url: string, data?: any) {
   const response = await api.post<T>(url, data);
   return response.data;
}
