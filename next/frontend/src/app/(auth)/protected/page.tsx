import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
   const { isAuthorized } = await auth();
   if (!isAuthorized) redirect("/login");

   return <div>Protected Content</div>;
}
