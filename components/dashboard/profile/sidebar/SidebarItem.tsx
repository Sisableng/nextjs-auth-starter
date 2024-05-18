"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  isActive?: boolean;
}

export default function SidebarItem({
  children,
  href,
  className,
  isActive,
}: SidebarItemProps) {
  return (
    <Button
      asChild
      variant={isActive ? "default" : "ghost"}
      className={cn("text-left", className)}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
