import React from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";

const DEFAULT_USER_IMG =
  "https://ui-avatars.com/api/?name=User&background=4ade80&color=fff&rounded=true";

const Dashboard = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authUser) {
      navigate("/signin");
    }
  }, [authUser, navigate]);

  if (!authUser) return null;

  const profilePic = authUser.profilePic || DEFAULT_USER_IMG;
  const fullName = authUser.fullName || "User";
  const email = authUser.email || "-";
  const createdAt = authUser.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString()
    : "-";

  return (
    <div className="w-full max-h-[583px] overflow-hidden flex border-t transition-colors">
      {/* Left Section */}
      <div className="w-1/3 max-h-full flex flex-col items-center justify-center p-8  border-r border-gray-300 dark:border-gray-700">
        <img
          src={profilePic}
          alt={fullName}
          className="w-28 h-28 rounded-full border-4 border-accent object-cover shadow mb-4"
          draggable={false}
        />
        <div className="text-xl font-bold bookcard-text mb-1 text-center">
          {fullName}
        </div>
        <div className="text-gray-600 dark:text-gray-300 text-center mb-2 break-all">
          {email}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Joined: {createdAt}
        </div>
      </div>
      {/* Right Section */}
      <div className="w-2/3 p-10 flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold text-accent mb-4 font-['Winky Rough']">
          Dashboard
        </h2>
        <div className="text-gray-500 dark:text-gray-300 text-center">
          {/* Placeholder for dashboard content */}
          Welcome to your dashboard! More features coming soon.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
