import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaHeart,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

function HostDashboard() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center p-6"
        style={{ backgroundImage: "url('/animals.jpg')" }}
      >
        {auth.user ? (
          <>
            <div className="text-center my-6">
              <h1 className="text-2xl text-white font-bold">
                Welcome, {auth.user.name}
              </h1>
              <p className="text-white">{auth.user.email}</p>
            </div>
            <div className="guest-dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto p-4">
              <button
                className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-blue-600 transition"
                onClick={() => navigate("/host/profile")}
              >
                <FaUser className="text-3xl mb-2" />
                Your Account
              </button>
              <button
                className="bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-green-600 transition"
                onClick={() => navigate("/host/bookings")}
              >
                <FaClipboardList className="text-3xl mb-2" />
                Your Bookings
              </button>
              <button
                className="bg-pink-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-pink-600 transition"
                onClick={() => navigate("/host/favourites")}
              >
                <FaHeart className="text-3xl mb-2" />
                Your Favourites
              </button>
              <button
                className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-yellow-600 transition"
                onClick={() => navigate("/")}
              >
                <FaHome className="text-3xl mb-2" />
                Want to be a Guest?
              </button>
              <button
                className="bg-red-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-red-600 transition"
                onClick={logout}
              >
                <FaSignOutAlt className="text-3xl mb-2" />
                Log Out
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default HostDashboard;
