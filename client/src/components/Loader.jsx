import React from "react";
import { Loader as LucideLoader } from "lucide-react";

const Loader = () => (
  <div className="flex flex-col w-full min-h-screen items-center justify-center py-12">
    <LucideLoader className="animate-spin text-accent" size={48} />
    <span className="mt-4 text-accent font-semibold text-lg">Loading...</span>
  </div>
);

export default Loader;
