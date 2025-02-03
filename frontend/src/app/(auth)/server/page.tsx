import { Button } from "@/components/ui/button";

import { auth } from "@/auth";
import { getAxiosClient } from "@/lib/axios";
import {
   ClientPageButton,
   LoginPageButton,
   ServerPageButton,
} from "../login/page";

export default async function ServerPage() {
   const { user } = await auth();
   console.log("user: ", user);

   const handlePublic = async () => {
      "use server";

      const client = await getAxiosClient();
      const { data } = await client.get("api/public");

      console.log("public call: ", data);
   };

   const handleProtected = async () => {
      "use server";

      const client = await getAxiosClient();
      const { data } = await client.get("api/protected");

      console.log("protected call: ", data);
   };

   const handleAuthCheck = async () => {
      "use server";

      const client = await getAxiosClient();
      const { data } = await client.get("api/auth/check");

      console.log("auth check call: ", data);
   };
   return (
      <>
         <main className="flex flex-col gap-2 items-center justify-center">
            <div className="text-2xl font-semibold p-4">Server page</div>
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

            <div className="flex gap-2 items-center justify-center">
               <Button onClick={handleAuthCheck}>Auth check call</Button>
            </div>
         </main>
      </>
   );
}
