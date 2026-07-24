"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body className="w-screen min-h-screen bg-background flex items-center justify-center flex-col gap-4">
        <h2 className="text-3xl font-medium">Something went wrong!</h2>
        <Button
          variant={"outline"}
          size={"xl"}
          onClick={() => unstable_retry()}
        >
          <RotateCcw />
          Try again
        </Button>
      </body>
    </html>
  );
}
