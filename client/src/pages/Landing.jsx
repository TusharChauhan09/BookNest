import React from "react";
import { useAuth } from "../store/useAuth";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../store/useTheme";


const features = [
  {
    title: "Personal Library",
    description:
      "Save and organize your favorite books in your own digital library.",
    icon: "📚",
    accent: "bg-accent/10 text-white  border-accent dark:bg-gray-900 dark:border-gray-700",
  },
  {
    title: "Track Reading",
    description:
      "Mark books as To Read, Reading, or Read and track your progress.",
    icon: "📈",
    accent:
      "bg-green-100 text-white border-green-400 dark:bg-green-900 dark:border-green-700",
  },
  {
    title: "Explore Books",
    description: "Browse a curated collection and discover new titles.",
    icon: "🔍",
    accent: "bg-blue-500 border-blue-400 dark:bg-blue-900 dark:text-black dark:border-blue-700",
  },
  {
    title: "Profile Customization",
    description:
      "Personalize your profile with a picture and your reading stats.",
    icon: "👤",
    accent:
      "bg-yellow-100 border-yellow-400 dark:bg-yellow-900 dark:border-yellow-700",
  },
  {
    title: "Cloud Sync",
    description: "Access your library from any device, anytime.",
    icon: "☁️",
    accent:
      "bg-purple-100 text-white border-white-400 dark:bg-purple-900 dark:border-purple-700",
  },
  {
    title: "Open Source",
    description: "View the code and contribute on GitHub.",
    icon: "💻",
    accent: "bg-gray-100 text-white  border-gray-400 dark:bg-gray-900 dark:border-gray-700",
  },
];

const Landing = () => {
  const { authUser } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="w-full max-w-3xl text-center mt-20 mb-12 px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-accent font-['Winky Rough'] drop-shadow-lg">
          Welcome to <span className="text-accent">BookNest</span>
        </h1>
        <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto">
          Discover, collect, and manage your favorite books. Create your
          personal library, track your reading, and explore new titles—all in
          one beautiful place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="https://github.com/TusharChauhan09/BookNest"
            className="bg-accent flex gap-x-2 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-accent/90 transition text-lg"
          >
            Repository
            <Github />
          </Link>
          {!authUser && (
            <Link
              to="/signin"
              className="px-8 py-3 rounded-full font-bold border-2 border-accent text-accent hover:bg-accent/10 transition text-lg"
            >
              Sign In
            </Link>
          )}
        </div>
        {!authUser && (
        <div>
          {" "}
          <span className="text-red-600 text-2xl">*</span> In order to track
          your reading progress, please sign in.
        </div>
      )}
      </section>
      {/* Bento Grid Section */}
      <section className="w-full max-w-6xl px-2 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-accent tracking-wide">
          What BookNest Provides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 flex flex-col gap-2 shadow-md hover:scale-[1.03] transition-transform ${feature.accent}`}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <div className="font-bold text-lg mb-1">{feature.title}</div>
              <div
                className={
                  feature.title === "Personal Library" ||
                  feature.title === "Open Source"
                    ? "text-accent dark:text-gray-200"
                    : "text-gray-800 dark:text-gray-200"
                }
              >
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Book Showcase removed as requested */}
      {/* Footer-like tagline */}
      
      <div className="mt-16 mb-4 text-gray-400 text-sm text-center">
        Made with <span className="text-accent">♥</span> for book lovers
        everywhere.
      </div>
    </div>
  );
};

export default Landing;
