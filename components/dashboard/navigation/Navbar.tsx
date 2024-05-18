"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import dynamic from "next/dynamic";
import ThemeButtonSkeleton from "@/components/skeleton/ThemeButtonSkeleton";

const ThemeButton = dynamic(() => import("@/components/ThemeButton"), {
  ssr: false,
  loading: () => <ThemeButtonSkeleton />,
});

const ProfileMenu = dynamic(() => import("./ProfileMenu"), {
  ssr: false,
  loading: () => <ThemeButtonSkeleton />,
});

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="fixed inset-x-0 top-0">
      <nav className="border-b bg-background">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={"/dashboard"}>
              <h3>Dashboard</h3>
            </Link>
            <Link href={"/dashboard/profile"}>Profile</Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeButton />
            {session && <ProfileMenu session={session} />}
          </div>
        </div>
      </nav>
    </div>
  );
}
