import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "./store/useTheme";
import { useAuth } from "./store/useAuth";
import { Toaster } from "react-hot-toast";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Inventory from "./pages/Inventory";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

function AppRouter() {
  useEffect(() => {
    useTheme.getState().loadTheme();
    useAuth.getState().checkAuth(); // Ensure authUser is set on app load
  }, []);

  const location = useLocation();
  const hideFooterPrefixes = ["/dashboard", "/signin", "/signup"];
  const currentPath = location.pathname.toLowerCase().replace(/\/+$/, "");
  const shouldShowFooter = !hideFooterPrefixes.some((prefix) =>
    currentPath.startsWith(prefix)
  );

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="pt-28">
        {" "}
        {/* Add top padding to prevent content from being hidden behind the fixed NavBar */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/books/:id" element={<h1>books</h1>} />
          <Route path="/settings" element={<h1>settings</h1>} />
          <Route path="/profile" element={<h1>profile</h1>} />
        </Routes>
        <Toaster />
      </div>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default AppRouter;
