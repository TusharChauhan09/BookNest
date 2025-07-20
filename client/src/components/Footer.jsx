import React, { use } from "react";
import { useAuth } from "../store/useAuth";

const Footer = () => {

    // const { authUser } = useAuth();
    // if(!authUser || authUser===null) return null;
return (
<footer className="w-full bottom-5 py-4  bg-bg border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
    <span>
      &copy; {new Date().getFullYear()} BookNest. All rights reserved.
    </span>
    <span className="block mt-1">
      Made with <span className="text-accent">♥</span> tusharchauhan09
    </span>
  </footer>
);

}
export default Footer;
