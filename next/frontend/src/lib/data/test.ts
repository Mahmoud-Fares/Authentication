"use server";

import { getAxiosClient } from "../axios";

export async function getPublicData() {
   const axiosInstance = await getAxiosClient();
   const response = await axiosInstance.get("/api/public");
   return response.data;
}

export async function getProtectedData() {
   const axiosInstance = await getAxiosClient();
   const response = await axiosInstance.get("/api/protected");
   return response.data;
}
