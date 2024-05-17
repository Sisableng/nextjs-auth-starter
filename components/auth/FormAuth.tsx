"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

const RegisterForm = dynamic(() => import("./RegisterForm"), {
  loading: () => (
    <div className="flex h-40 items-center justify-center">
      <LoaderCircle size={40} className="animate-spin text-primary" />
    </div>
  ),
});
const LoginForm = dynamic(() => import("./LoginForm"), {
  loading: () => (
    <div className="flex h-40 items-center justify-center">
      <LoaderCircle size={40} className="animate-spin text-primary" />
    </div>
  ),
});

export default function FormAuth() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  if (session) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">
            {`You're already logged in.`}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild>
            <Link href={"/dashboard"}>Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {searchParams.get("auth") === "sign-up" ? "SignUp" : "SignIn"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {searchParams.get("auth") === "sign-up" ? (
          <RegisterForm />
        ) : (
          <LoginForm />
        )}
      </CardContent>
    </Card>
  );
}
