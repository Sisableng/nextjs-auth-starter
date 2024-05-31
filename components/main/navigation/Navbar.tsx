"use client";

import ThemeButtonSkeleton from "@/components/skeleton/ThemeButtonSkeleton";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ThemeButton = dynamic(() => import("@/components/ThemeButton"), {
  ssr: false,
  loading: () => <ThemeButtonSkeleton />,
});

export default function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-10">
      <nav className="bg-background">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href={"/"}
              className="transition-colors ease-in-out hover:text-primary"
            >
              <h3>NSK</h3>
            </Link>
            <Link
              href={"/"}
              className="transition-colors ease-in-out hover:text-primary"
            >
              Home
            </Link>
            <Link
              href={"/feature"}
              className="transition-colors ease-in-out hover:text-primary"
            >
              Feature
            </Link>
          </div>
          <div>
            <ThemeButton />
          </div>
        </div>
      </nav>
    </div>
  );
}
