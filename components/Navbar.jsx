"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 flex justify-between bg-slate-900 text-white">
      <h1 className="text-xl font-bold">SJCET Link Shortener</h1>
      {session ? (
        <div>
          <span className="mr-4">{session.user.name}</span>
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      ) : (
        <Button onClick={() => signIn()}>Login</Button>
      )}
    </nav>
  );
}
