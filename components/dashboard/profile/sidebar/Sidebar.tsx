"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Settings, Shield, User } from "lucide-react";

const SidebarItem = dynamic(() => import("./SidebarItem"), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-full bg-accent" />,
});

const sidebarItems: { href: string; title: string; icon: React.ReactNode }[] = [
  {
    href: "/dashboard/profile",
    title: "Profile",
    icon: <User />,
  },
  {
    href: "/dashboard/profile/security",
    title: "Security",
    icon: <Shield />,
  },
  {
    href: "/dashboard/profile/options",
    title: "Options",
    icon: <Settings />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-2 rounded-md bg-card p-6">
      {sidebarItems.map((item, idx) => (
        <SidebarItem
          key={`item${idx}`}
          href={item.href}
          className={"flex items-center justify-start gap-4"}
          isActive={pathname === item.href}
        >
          <span>{item.icon}</span>
          <span>{item.title}</span>
        </SidebarItem>
      ))}
    </div>
  );
}
