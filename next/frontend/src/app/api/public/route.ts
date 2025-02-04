import { getProxyClient } from "@/lib/axios/axios-server";

export async function GET() {
   try {
      const client = await getProxyClient();
      const response = await client.get("/api/public");

      return Response.json(response.data);
   } catch (error: any) {
      return Response.json(
         { error: error.response?.data?.message || error.message },
         { status: error.response?.status || 500 }
      );
   }
}
