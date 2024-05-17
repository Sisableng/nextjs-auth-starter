"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div>
      <nav className="container flex h-20 items-center justify-between">
        <h3>Dashboard</h3>
        <div>
          {session && (
            <Button variant={"outline"} onClick={() => signOut()}>
              SignOut
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
