// src/components/Layout.tsx
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import WhatsAppFloat from "@/components/whatsapp";
import Footer from '@/components/footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      <WhatsAppFloat />
      <main className="pt-30">
        <Outlet />
      </main>
      <Footer />

    </div>
  );
}
