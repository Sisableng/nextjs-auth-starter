"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, MoonStar, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

interface Theme {
  title: string;
  theme: string;
  icon: React.ReactNode;
}

export default function ThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();

  const iconSize = 16;

  const themes: Theme[] = [
    {
      title: "Light",
      theme: "light",
      icon: <Sun size={iconSize} />,
    },
    {
      title: "Dark",
      theme: "dark",
      icon: <MoonStar size={iconSize} />,
    },
    {
      title: "System",
      theme: "system",
      icon: <Monitor size={iconSize} />,
    },
  ];
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonStar className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="space-y-1">
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme.theme}
              onClick={() => setTheme(theme.theme)}
              className={clsx(
                "gap-3",
                resolvedTheme === theme.theme &&
                  "bg-primary text-zinc-100 focus:bg-primary/80 focus:text-zinc-100",
              )}
            >
              <span>{theme.icon}</span>
              <span>{theme.title}</span>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuArrow className="fill-popover" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
