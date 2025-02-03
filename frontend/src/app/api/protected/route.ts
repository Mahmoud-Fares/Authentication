import { getProxyClient, getServerClient } from "@/lib/axios/axios-server";
import { cookies } from "next/headers";

export async function GET() {
   try {
      console.log(
         "____________________________________INSIDE PROTECTED GET API ROUTE____________________________________"
      );

      const cookieStore = await cookies();
      console.log("cookieStore", cookieStore);

      // const { isAuthorized } = await auth(); I've tried to directly use this but it doesn't work
      const serverClient = await getServerClient();
      const { data } = await serverClient.get("/api/auth/check");
      const { isAuthorized } = data;

      const cookieStoreAfterRefresh = await cookies();
      console.log("cookieStoreAfterRefresh", cookieStoreAfterRefresh);

      if (!isAuthorized) return Response.redirect("/login");

      const client = await getProxyClient();
      const response = await client.get("/api/protected");

      return Response.json(response.data);
   } catch (error: any) {
      return Response.json(
         { error: error.response?.data?.message || error.message },
         { status: error.response?.status || 500 }
      );
   }
}
