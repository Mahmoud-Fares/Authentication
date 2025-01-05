"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return (
         <Toggle variant="outline" className="group size-9">
            <Sun
               size={16}
               strokeWidth={2}
               className="absolute shrink-0"
               aria-hidden="true"
            />
         </Toggle>
      );
   }

   return (
      <div>
         <Toggle
            variant="outline"
            className="group size-9"
            onPressedChange={() =>
               setTheme(theme === "dark" ? "light" : "dark")
            }
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            pressed={theme === "dark"}
         >
            <Moon
               size={16}
               strokeWidth={2}
               className="shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
               aria-hidden="true"
            />
            <Sun
               size={16}
               strokeWidth={2}
               className="absolute shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
               aria-hidden="true"
            />
         </Toggle>
      </div>
   );
}
