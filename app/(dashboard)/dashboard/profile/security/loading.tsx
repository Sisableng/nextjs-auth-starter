import { LoaderCircle } from "lucide-react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="grid h-60 place-content-center">
      <span>
        <LoaderCircle size={32} className="animate-spin text-primary" />
      </span>
    </div>
  );
}
