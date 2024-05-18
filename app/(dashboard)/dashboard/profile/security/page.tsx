import PasswordForm from "@/components/dashboard/profile/form/PasswordForm";
import React from "react";

export default function ProfileSecurityPage() {
  return (
    <section className="space-y-10">
      <h2>Security</h2>
      <div>
        <PasswordForm />
      </div>
    </section>
  );
}
