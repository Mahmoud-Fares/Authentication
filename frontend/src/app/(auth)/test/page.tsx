import { getServerSession } from "next-auth";
import ClientComponent from "./client-component";
import { api } from "@/lib/api-client";

export default async function Test() {
   // const { data: res } = await api.get("/api/protected", {
   //    withCredentials: true,
   // });
   // console.log("res", res);
   return (
      <main className="mt-8 flex flex-col gap-8 items-center justify-center">
         <ServerTest />
         <ClientComponent />
         <br />
         <br />
         {/* <pre>{JSON.stringify(res, null, 2)}</pre> */}
      </main>
   );
}

async function ServerTest() {
   const session = await getServerSession();
   console.log("server session", session);

   return (
      <div className="flex flex-col gap-2 items-center justify-center">
         <h2>Server Component test</h2>
         <p>Welcome {session?.user?.name || "no user"}</p>
         <p>Your email is: {session?.user?.email || "no mail"}</p>
      </div>
   );
}
