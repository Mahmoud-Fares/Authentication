"use client";

import { Button } from "@/components/ui/button";
import { login, logout, getUsers, refresh, me } from "@/lib/api/usage";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
   const [data, setData] = useState<any>();

   const handleLogin = async () => {
      const response = await login({
         email: "mahmoud@email.com",
         password: "admin1234",
      });
      console.log(response);
      setData(response);
   };

   const handleLogout = async () => {
      const response = await logout();
      console.log(response);
      setData(response);
   };

   const handleGetUsers = async () => {
      const response = await getUsers();
      console.log(response);
      setData(response);
   };

   const handleRefresh = async () => {
      const response = await refresh();
      console.log(response);
      setData(response);
   };

   const handleMe = async () => {
      const response = await me();
      console.log(response);
      setData(response);
   };

   return (
      <main className="flex flex-col gap-2 items-center justify-center">
         <div className="text-2xl font-semibold p-4">Login page</div>

         <div className="flex gap-2 items-center justify-center">
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleLogout}>Logout</Button>
         </div>

         <div className="flex gap-2 items-center justify-center">
            <Button onClick={handleGetUsers}>Get Users (protected)</Button>
         </div>

         <div className="flex gap-2 items-center justify-center">
            <Button onClick={handleRefresh}>Refresh</Button>
         </div>

         <div className="flex gap-2 items-center justify-center">
            <Button onClick={handleMe}>me</Button>
         </div>

         <div className="flex gap-2 items-center justify-center">
            <ServerPageButton />
            <ClientPageButton />
         </div>

         <br />
         <br />

         <RenderData data={data} />
      </main>
   );
}

export const LoginPageButton = () => {
   return <Button onClick={() => redirect("/login")}>Login page</Button>;
};

export const ServerPageButton = () => {
   return <Button onClick={() => redirect("/server")}>server page</Button>;
};

export const ClientPageButton = () => {
   return <Button onClick={() => redirect("/client")}>client page </Button>;
};

export const RenderData = ({ data }: { data: any }) => {
   return (
      !!data && (
         <pre className="bg-card border p-5 rounded-md">
            {JSON.stringify(data, null, 2)}
         </pre>
      )
   );
};
