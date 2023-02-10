import React from "react";

import type { GeneralProps } from "@/common/props";

import { NavBar, Sidebar } from "@/components";

export default function Layout({ children }: GeneralProps) {
  return (
    <div className="p-0 flex relative h-screen">
      <Sidebar />
      <main>
        <NavBar />
        {children}
      </main>
    </div>
  );
}
