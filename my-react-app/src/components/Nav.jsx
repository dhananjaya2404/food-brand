import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../components/pages/Cart.jsx";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState("checking...");
  const navigate = useNavigate();

  // Nav links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
  ];

  return (

    <>
    <nav className="fixed w-full bg-orange-300 backdrop-blur-md shadow-md px-6 py-4 flex items-center justify-between z-50">
      {/* Logo */}
      <a href="/" className="flex items-center text-xl font-bold gap-2">
        <span>🚀</span> FoodApp
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-gray-800 hover:text-red-500 font-semibold transition"
          >
            {link.name}
          </a>
        ))}

        {/* Signup / Login Buttons */}
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-1 rounded-lg border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition"
        >
          Signup
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Login
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md shadow-md flex flex-col items-center md:hidden py-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-2 text-gray-800 hover:text-red-500 font-semibold w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              navigate("/signup");
              setMenuOpen(false);
            }}
            className="w-3/4 py-2 my-1 rounded-lg border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition"
          >
            Signup
          </button>
          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="w-3/4 py-2 my-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Login
          </button>
        </div>
      )}

    </nav>
    <div className="pt-20 md:pt-24">
        <Cart/>
    </div>
    </>
  );
}
