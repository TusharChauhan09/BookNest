import { create } from "zustand";

export const useTheme = create((set) => ({
  theme: "light",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  },
  loadTheme: () => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        set({ theme: storedTheme });
        document.documentElement.classList.toggle(
          "dark",
          storedTheme === "dark"
        );
      }
    }
  },
}));
