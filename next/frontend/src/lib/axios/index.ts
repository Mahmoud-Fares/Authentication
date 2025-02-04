import axios from "axios";
import { AXIOS_CONFIG_TEST, getServerClient } from "./axios-server";

const clientAxios = axios.create(AXIOS_CONFIG_TEST); // instead of the one in axios-client.ts

export const getAxiosClient = async () => {
   if (typeof window !== "undefined") return clientAxios;

   return getServerClient();
};
