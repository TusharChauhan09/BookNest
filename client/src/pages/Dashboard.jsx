import React from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import BookCard from "../components/Books/BookCard";
import DashboardBookCard from "../components/Books/DashboardBookCard";
import toast from "react-hot-toast";

const DEFAULT_USER_IMG =
  "https://ui-avatars.com/api/?name=User&background=4ade80&color=fff&rounded=true";

const Dashboard = () => {
  const { authUser, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editData, setEditData] = React.useState(null);
  const [updatingProfile, setUpdatingProfile] = React.useState(false);
  const [showProfileForm, setShowProfileForm] = React.useState(false);
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [selectedImg, setSelectedImg] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  React.useEffect(() => {
    if (!authUser) {
      navigate("/signin");
    } else {
      axiosInstance
        .get(`/books/user/${authUser._id}`)
        .then((res) => setUserBooks(res.data))
        .catch(() => setUserBooks([]))
        .finally(() => setLoading(false));
    }
  }, [authUser, navigate]);

  React.useEffect(() => {
    if (authUser) {
      setEditData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        profilePic: authUser.profilePic || "",
      });
    }
  }, [authUser]);

  if (!authUser || !editData) return <div>Loading...</div>;

  const profilePic = authUser.profilePic || DEFAULT_USER_IMG;
  const fullName = authUser.fullName || "User";
  const email = authUser.email || "-";
  const createdAt = authUser.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString()
    : "-";

  const handleProfileChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleProfilePicFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditData((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
        const res = await axiosInstance.put("/auth/update", {
          profilePic: base64Image,
        });
        if (
          res.data &&
          (res.data.profilePic ||
            (res.data.details && res.data.details.profilePic))
        ) {
          toast.success("Profile image updated!");
          const url =
            res.data.profilePic ||
            (res.data.details && res.data.details.profilePic);
          console.log("Profile image URL:", url);
          await checkAuth();
          setShowProfileForm(false);
        } else {
          toast.error("Failed to update profile image (no URL returned)");
          console.error("No profilePic in response", res.data);
        }
      } catch (err) {
        toast.error("Failed to update profile image");
        console.error(err);
      }
    };
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const res = await axiosInstance.put("/auth/update", editData);
      toast.success(res.data.message || "Profile updated!");
      await checkAuth();
      setShowProfileForm(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const refreshBooks = () => {
    setLoading(true);
    axiosInstance
      .get(`/books/user/${authUser._id}`)
      .then((res) => setUserBooks(res.data))
      .catch(() => setUserBooks([]))
      .finally(() => setLoading(false));
  };

  const handleUpdate = (success) => {
    if (success) toast.success("Book status updated!");
    refreshBooks();
  };

  const handleDelete = (success) => {
    if (success) toast.success("Book removed from your collection!");
    refreshBooks();
  };

  return (
    <div
      className="w-full flex flex-col md:flex-row overflow-hidden border-t transition-colors border-gray-300 dark:border-gray-700"
      style={{ minHeight: "calc(100vh - 7rem)" }}
    >
      {/* Left Section */}
      <div className="w-full md:w-1/4 h-auto md:h-full flex flex-col items-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700">
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

        {/* Profile Update Button and Form */}
        {!showProfileForm ? (
          <button
            className="mt-6 w-full bg-accent text-white rounded py-2 font-bold hover:bg-accent/90 transition"
            onClick={() => setShowProfileForm(true)}
          >
            Update Profile
          </button>
        ) : (
          <form
            className="mt-6 w-full flex flex-col gap-3"
            onSubmit={handleProfileUpdate}
          >
            <input
              type="text"
              name="fullName"
              value={editData.fullName}
              onChange={handleProfileChange}
              placeholder="Full Name"
              className="rounded px-3 py-2 border border-gray-300 dark:border-gray-700 bg-bg text-text"
              required
            />
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleProfileChange}
              placeholder="Email"
              className="rounded px-3 py-2 border border-gray-300 dark:border-gray-700 bg-bg text-text"
              required
            />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="profilePicUpload"
                className="cursor-pointer bg-accent text-white px-4 py-2 rounded font-semibold text-center hover:bg-accent/90 transition"
              >
                Choose Image
              </label>
              <input
                id="profilePicUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {(selectedImg || editData.profilePic) && (
              <img
                src={selectedImg || editData.profilePic}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full mt-2 object-cover border-2 border-accent"
              />
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-accent text-white rounded py-2 font-bold mt-2 hover:bg-accent/90 transition flex-1"
                disabled={updatingProfile}
              >
                {updatingProfile ? "Updating..." : "Save"}
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white rounded py-2 font-bold mt-2 hover:bg-gray-500 transition flex-1"
                onClick={() => setShowProfileForm(false)}
                disabled={updatingProfile}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {/* Right Section */}
      <div
        className="flex-1 p-4 md:p-10 flex flex-col items-center overflow-y-auto border-l-0 md:border-l-2"
        style={{ height: "100%" }}
      >
        <h2 className="text-2xl font-bold text-accent mb-4 font-['Winky Rough']">
          Dashboard
        </h2>
        <div className="text-gray-500  text-center mb-4">
          Your Book Collection:
        </div>
        <div className="mb-6 flex gap-2 items-center">
          <span className="font-semibold">Filter by status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1 rounded border text-white bg-black "
          >
            <option value="">All</option>
            <option value="to_read">To Read</option>
            <option value="reading">Reading</option>
            <option value="read">Read</option>
          </select>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : userBooks.length === 0 ? (
          <div>No books in your collection yet.</div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userBooks
              .filter(
                (userBook) =>
                  !statusFilter || userBook.category === statusFilter
              )
              .map((userBook) =>
                userBook.book ? (
                  <DashboardBookCard
                    key={userBook._id}
                    userBook={userBook}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ) : null
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
