import DangerArea from "@/components/dashboard/profile/form/DangerArea";
import { Separator } from "@/components/ui/separator";
import React from "react";
import BroWtf from "./BroWtf";

export default function ProfileOptionsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-8">
        <h2>Options</h2>
        <BroWtf />
      </div>
      <Separator className="dark:bg-accent" />
      <DangerArea />
    </section>
  );
}
