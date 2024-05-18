"use client";
import React from "react";
import { LogOut, User } from "lucide-react";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";

interface ProfileMenuProps {
  session: Session;
}

export default function ProfileMenu({ session }: ProfileMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  return (
    <DropdownMenu modal={false} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <Avatar
          className={clsx(
            "transition-all ease-in-out",
            isDropdownOpen ? "ring-4 ring-secondary" : "ring-0",
          )}
        >
          <AvatarImage
            src={
              session?.user.avatar ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1mx40uHFyw-aCYh0PwEeL2opHnc_Y-1Bc6mFvbRiCjkqVF0FSTP4rj3WKCcIIfr4HhyU&usqp=CAU"
            }
          />
          <AvatarFallback>{"USR"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"}>
        <DropdownMenuLabel className="text-xs">{`#${session.user.username}`}</DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-accent" />
        <div className="space-y-1">
          <DropdownMenuItem className="cursor-pointer text-sm" asChild>
            <Link
              href={"/dashboard/profile"}
              className="flex items-center gap-3"
            >
              <span>
                <User size={16} />
              </span>
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-3 text-sm text-destructive"
            onClick={() => signOut()}
          >
            <span>
              <LogOut size={16} />
            </span>
            <span>SignOut</span>
          </DropdownMenuItem>
        </div>
        <DropdownMenuArrow className="fill-popover" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
