import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "./store/useTheme";


import NavBar from "./components/NavBar";

import Landing from "./pages/Landing";
import Inventory from "./pages/Inventory";

function AppRouter() {
  useEffect(() => {
    useTheme.getState().loadTheme();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="pt-28">
        {" "}
        {/* Add top padding to prevent content from being hidden behind the fixed NavBar */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<h1>Signup</h1>} />
          <Route path="/signin" element={<h1>Signin</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/books/:id" element={<h1>books</h1>} />
          <Route path="/settings" element={<h1>settings</h1>} />
          <Route path="/profile" element={<h1>profile</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default AppRouter;
