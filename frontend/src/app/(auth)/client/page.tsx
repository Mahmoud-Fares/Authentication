"use client";

import { Button } from "@/components/ui/button";
import { protectedRoute, publicRoute } from "@/lib/api/usage";

import { useState } from "react";
import {
   ClientPageButton,
   LoginPageButton,
   RenderData,
   ServerPageButton,
} from "../login/page";

export default function LoginPage() {
   const [data, setData] = useState<any>("");

   const handlePublic = async () => {
      const response = await publicRoute();
      console.log(response);
      setData(response);
   };

   const handleProtected = async () => {
      const response = await protectedRoute();
      console.log(response);
      setData(response);
   };

   return (
      <>
         <main className="flex flex-col gap-2 items-center justify-center">
            <div className="text-2xl font-semibold p-4">Client page</div>
            <div className="flex gap-2 items-center justify-center">
               <LoginPageButton />
            </div>

            <div className="flex gap-2 items-center justify-center">
               <ServerPageButton />
               <ClientPageButton />
            </div>

            <div className="flex gap-2 items-center justify-center">
               <Button onClick={handlePublic}>Public call</Button>
               <Button onClick={handleProtected}>Protected call</Button>
            </div>

            <br />
            <br />

            <RenderData data={data} />
         </main>
      </>
   );
}
