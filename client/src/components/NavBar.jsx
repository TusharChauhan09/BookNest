import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../store/useTheme";
import logo from "../assets/react.svg";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "../store/useAuth";
import DashboardBtn from "./DashboardBtn";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1 rounded-full bg-accent text-white font-semibold shadow hover:scale-105 transition-transform"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}

const NavBar = () => {
  const { authUser, signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    navigate("/signin");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 mb-20 max-w-4xl mx-auto flex items-center justify-between px-6 py-3 rounded-full mt-4 bg-bg text-text shadow border border-gray-200 dark:border-gray-700"
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 select-none">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-lg">BookNest</span>
      </Link>
      {/* Links */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          to="/Inventory"
          className="p-2 rounded-full hover:bg-accent/20 transition-colors font-medium"
          aria-label="Inventory"
        >
          Inventory
        </Link>
        <Link
          to="/about"
          className="p-2 rounded-full hover:bg-accent/20 transition-colors font-medium"
          aria-label="About"
        >
          About
        </Link>
        <ThemeToggle />
        {authUser ? (
          <>
            <DashboardBtn />
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1.5 rounded-full bg-accent text-white font-semibold shadow border-2 border-accent hover:scale-105 transition-transform flex items-center gap-1"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/signin"
            className="ml-2 px-3 py-1.5 rounded-full bg-accent text-white font-semibold shadow border-2 border-accent hover:scale-105 transition-transform flex items-center gap-1"
          >
            <LogIn size={18} />
            <span className="hidden sm:inline">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
