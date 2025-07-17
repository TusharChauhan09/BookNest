import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "./store/useTheme";
import ThemeToggle from "./components/ThemeToggle";

import Landing from "./pages/Landing";


function AppRouter() {
  useEffect(() => {
    useTheme.getState().loadTheme();
  }, []);

  return (
    <div
      className="min-h-screen"
     
    >
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<h1>Signup</h1>} />
        <Route path="/signin" element={<h1>Signin</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/books" element={<h1>books</h1>} />
        <Route path="/books/:id" element={<h1>books</h1>} />
        <Route path="/settings" element={<h1>settings</h1>} />
        <Route path="/profile" element={<h1>profile</h1>} />
      </Routes>
    </div>
  );
}

export default AppRouter;
