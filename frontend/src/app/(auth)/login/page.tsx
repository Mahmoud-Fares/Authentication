"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export default function LoginPage() {
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      await signIn("credentials", {
         email: formData.get("email"),
         password: formData.get("password"),
         redirect: true,
         callbackUrl: "/",
      });
   };
   const handleLogin = async () => {
      const loginResponse = await signIn("credentials", {
         email: "mahmoud@email.com",
         password: "admin1234",
         redirect: true,
         callbackUrl: "/",
      });

      console.log("loginResponse", loginResponse);
   };

   const handleLogout = async () => {
      const logoutResponse = await signOut();
      console.log("logoutResponse", logoutResponse);
   };

   return (
      <div className="flex flex-col gap-2 items-center justify-center">
         <form
            className="flex flex-col gap-2 items-center justify-center"
            onSubmit={handleSubmit}
         >
            <input name="email" type="email" />
            <input name="password" type="password" />
            <Button type="submit">Type email & password and Sign In</Button>
         </form>

         <p>Or</p>

         <div className="flex gap-2 items-center justify-center">
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleLogout}>Logout</Button>
         </div>

         <div className="flex gap-2 items-center justify-center">
            <Button onClick={() => signIn("google")}>
               Sign in with Google
            </Button>
         </div>
      </div>
   );
}
