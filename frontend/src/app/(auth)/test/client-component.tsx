"use client";

import { useSession } from "next-auth/react";

export default function ClientComponent() {
   const { data: session } = useSession();
   console.log("client session", session);

   return (
      <div className="flex flex-col gap-2 items-center justify-center">
         <p>Client component test</p>
         <p>Welcome {session?.user?.name || "no user"}</p>
         <p>Your email is: {session?.user?.email || "no mail"}</p>
      </div>
   );
}
