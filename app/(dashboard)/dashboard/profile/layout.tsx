import Sidebar from "@/components/dashboard/profile/sidebar/Sidebar";
import React from "react";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      <div>
        <Sidebar />
      </div>
      <div className="rounded-md bg-card p-6 md:col-span-2">{children}</div>
    </div>
  );
}
