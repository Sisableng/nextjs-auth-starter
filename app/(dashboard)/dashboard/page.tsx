"use client";
import { Separator } from "@/components/ui/separator";
import { Braces } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <section className="mt-20">
        <p>Session Null</p>
      </section>
    );
  }
  return (
    <section className="space-y-8">
      <div className="max-w-sm">
        <h1 className="leading-tight">
          <span className="font-normal">Hi,</span>{" "}
          <span className="font-semibold">
            {session?.user?.name ?? session?.user?.email}
          </span>
        </h1>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">
            <Braces />
          </span>
          <h4>JSON Object</h4>
        </div>
        <pre className="rounded-md bg-card p-4">
          <code className="text-pretty text-yellow-500">
            {JSON.stringify(session, null, 2)}
          </code>
        </pre>
      </div>
    </section>
  );
}
