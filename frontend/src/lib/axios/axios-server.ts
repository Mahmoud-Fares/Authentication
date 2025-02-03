import "server-only";

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = "http://localhost:3000";

export const AXIOS_CONFIG_TEST = {
   baseURL: API_URL,
   withCredentials: true,
   headers: {
      "Content-Type": "application/json",
   },
};

const getProxyConfig = async () => {
   const cookieStore = await cookies();

   return {
      ...AXIOS_CONFIG_TEST,
      baseURL: "http://localhost:5000",
      headers: {
         ...AXIOS_CONFIG_TEST.headers,
         Cookie: cookieStore.toString(),
      },
   };
};

const getServerConfig = async () => {
   const cookieStore = await cookies();

   return {
      ...AXIOS_CONFIG_TEST,
      headers: {
         ...AXIOS_CONFIG_TEST.headers,
         Cookie: cookieStore.toString(),
      },
   };
};

export const getProxyClient = async () => axios.create(await getProxyConfig());
export const getServerClient = async () =>
   axios.create(await getServerConfig());
