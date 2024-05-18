import ProfileForm from "@/components/dashboard/profile/form/ProfileForm";
import React from "react";

export default function ProfilePage() {
  return (
    <section className="space-y-10">
      <h2>Profile</h2>
      <div>
        <ProfileForm />
      </div>
    </section>
  );
}
