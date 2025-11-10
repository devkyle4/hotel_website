// src/components/Navbar.tsx
import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  // 🔥 Listen for hash changes (e.g., /#amenities) and scroll after navigation
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);


  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);

    // Wait for the menu close animation (so scrolling works on mobile)
    setTimeout(() => {
      if (location.pathname === "/") {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/#${sectionId}`); // 👈 React Router SPA navigation (no reload)
      }
    }, 300);
  };


  const menuLinks = [
    { label: "Home", onClick: () => scrollToSection("home") },
    { label: "Rooms", to: "/rooms" },
    { label: "Amenities", onClick: () => scrollToSection("amenities") },
    { label: "Pub", to: "/pub" },
    { label: "Gallery", onClick: () => scrollToSection("gallery") },
    { label: "Contact", onClick: () => scrollToSection("contact") },
  ];



  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50 font-playwrite">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-amber-800"
        >
          99 Resort & Pub
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="text-gray-700 hover:text-amber-600 transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.onClick}
                className="text-gray-700 hover:text-amber-600 transition-colors"
              >
                {link.label}
              </button>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-inner"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {menuLinks.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:text-amber-600 text-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={link.onClick}
                    className="text-gray-700 hover:text-amber-600 text-lg transition-colors"
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
