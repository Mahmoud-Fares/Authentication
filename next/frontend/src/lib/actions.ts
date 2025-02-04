"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function sensitiveAction() {
   const { isAuthorized } = await auth();
   if (!isAuthorized) redirect("/login");

   // server action logic
   return { data: "Server action logic" };
}
