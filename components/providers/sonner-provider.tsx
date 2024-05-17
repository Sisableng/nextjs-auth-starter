import React from "react";
import { Toaster } from "@/components/ui/sonner";

interface SonnerProviderProps {
  children: React.ReactNode;
}

const SonnerProvider = ({ children }: SonnerProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        closeButton
        pauseWhenPageIsHidden
        richColors
        position="bottom-right"
      />
    </>
  );
};

export default SonnerProvider;
