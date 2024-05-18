"use client";

import React from "react";
import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TopBreadcrumbsProps {
  className?: string;
}

export default function TopBreadcrumbs({ className }: TopBreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");
  const capitalize = (str: string) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

  return (
    <div className={cn("", className)}>
      {pathname !== "/dashboard" && pathname !== "/" ? (
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((item, index) => {
              let href = `/${segments.slice(0, index + 1).join("/")}`;
              return (
                <React.Fragment key={`breadcrumb${index + 1}`}>
                  <BreadcrumbItem>
                    {pathname === href ? (
                      <BreadcrumbPage className="block max-w-[6rem] truncate">
                        {capitalize(item)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        asChild
                        aria-label={`Go to ${capitalize(item)}`}
                      >
                        <Link
                          href={href}
                          className="block max-w-[6rem] truncate"
                        >
                          {capitalize(item)}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {segments.length !== index + 1 && (
                    <BreadcrumbSeparator>
                      <Slash />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <Link href={"/"}>/</Link>
      )}
    </div>
  );
}
