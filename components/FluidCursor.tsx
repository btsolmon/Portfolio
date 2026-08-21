"use client";

import { useEffect } from "react";

import fluidCursor from "@/hooks/use-FluidCursor";

export default function FluidCursor() {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
}
