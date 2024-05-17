"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface NprogressProviderProps {
  children: React.ReactNode;
}

export default function NprogressProvider({
  children,
}: NprogressProviderProps) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#0ea5e9"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
