import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export function DotBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-auto w-full items-center justify-center wrap-anywhere">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {children}
    </div>
  );
}
