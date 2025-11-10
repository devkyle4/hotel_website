// src/components/Layout.tsx
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      <main className="pt-30">
        <Outlet />
      </main>
    </div>
  );
}
