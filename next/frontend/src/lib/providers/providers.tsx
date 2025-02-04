"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
   ThemeProvider as NextThemesProvider,
   ThemeProviderProps,
} from "next-themes";

import { useState } from "react";

export function Providers({ children }: ThemeProviderProps) {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  staleTime: 60 * 1000,
               },
            },
         })
   );

   return (
      <QueryClientProvider client={queryClient}>
         <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
         >
            {children}
         </NextThemesProvider>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}
