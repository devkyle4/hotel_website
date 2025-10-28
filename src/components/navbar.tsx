// src/components/Navbar.tsx
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 font-playwrite">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-amber-800"
        >
          99 Resort & Pub
        </motion.h1>

        <div className="hidden md:flex space-x-8 ">
          <button
            onClick={() => scrollToSection("home")}
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Home
          </button>
          <Link
            to="/rooms"
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Rooms
          </Link>
          <button
            onClick={() => scrollToSection("amenities")}
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Amenities
          </button>
          <Link
            to="/pub"
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Pub
          </Link>
          <button
            onClick={() => scrollToSection("gallery")}
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Contact
          </button>
        </div>

        {/* <Button
          onClick={() => scrollToSection("home")}
          className="bg-amber-600 hover:bg-amber-700"
        >
          Book Now
        </Button> */}
      </div>
    </nav>
  );
}
