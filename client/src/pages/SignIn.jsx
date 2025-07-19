import React, { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signin, isSigningIn, authUser } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    await signin(form);
  };

  return (
    <div className="max-h-[650px] min-h-[580px] flex items-center justify-center transition-colors">
      <div className="w-full max-w-md border p-8 rounded-2xl shadow-xl bookcard-bg bookcard-shadow">
        <h2 className="text-3xl font-bold mb-6 text-center text-accent font-['Winky Rough']">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block mb-1 font-semibold bookcard-text"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-accent bookcard-bg bookcard-text ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              value={form.email}
              onChange={handleChange}
              disabled={isSigningIn}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              className="block mb-1 font-semibold bookcard-text"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-accent bookcard-bg bookcard-text ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              value={form.password}
              onChange={handleChange}
              disabled={isSigningIn}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg font-bold text-lg bg-accent text-white shadow-lg hover:scale-[1.03] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm bookcard-text">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-accent font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
