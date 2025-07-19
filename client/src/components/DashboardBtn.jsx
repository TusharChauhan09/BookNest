import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";

const DEFAULT_USER_IMG =
  "https://ui-avatars.com/api/?name=User&background=4ade80&color=fff&rounded=true";

const DashboardBtn = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const profilePic = authUser?.profilePic || DEFAULT_USER_IMG;
  const altText = authUser?.fullName || authUser?.email || "User";

  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="w-11 h-11 rounded-full border-2 border-accent flex items-center justify-center overflow-hidden shadow hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label="Go to Dashboard"
      type="button"
    >
      <img
        src={profilePic}
        alt={altText}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </button>
  );
};

export default DashboardBtn;
