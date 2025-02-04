import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL, AXIOS_CONFIG } from "./config";

export const clientAxios = axios.create(AXIOS_CONFIG);

// Add retry tracking to request config
interface RetryConfig extends AxiosRequestConfig {
   _retry?: boolean;
}

clientAxios.interceptors.response.use(
   (response) => response,
   async (error: AxiosError) => {
      const originalRequest = error.config as RetryConfig;

      // Validate if we should attempt refresh
      if (!shouldAttemptRefresh(error, originalRequest)) {
         return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
         await refreshAuthToken();

         return clientAxios(originalRequest);
      } catch (refreshError) {
         handleRefreshFailure();

         return new Promise(() => {});
         // return Promise.reject(error);
         // return Promise.reject(new Error("Authentication expired"));
      }
   }
);

/* Helper Functions */
function shouldAttemptRefresh(
   error: AxiosError,
   config?: RetryConfig
): boolean {
   return (
      error.response?.status === 401 &&
      !!config &&
      !config?._retry &&
      isBrowserEnvironment()
   );
}

async function refreshAuthToken(): Promise<void> {
   try {
      // * Use other axios instance to prevent infinite loop
      await axios.get(`${API_URL}/api/auth/refresh`, {
         withCredentials: true,
      });

      // * OR
      // * use the same instance and Add this (config.url !== '/api/auth/refresh') to shouldAttemptRefresh check
      // await clientAxios.get("/api/auth/refresh");
   } catch (error) {
      throw new Error("Failed to refresh authentication token");
   }
}

function handleRefreshFailure(): void {
   if (isBrowserEnvironment()) {
      window.location.replace("/login");
      // Consider clearing any sensitive client-side state here ex(auth store)
   }
}

function isBrowserEnvironment(): boolean {
   return typeof window !== "undefined";
}
