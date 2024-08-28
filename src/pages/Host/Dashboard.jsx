import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

function HostDashboard() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
     <div
  className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/animals.jpg')" }}
>
  {auth.user ? (
    <>
      {/* Centered Text Container */}
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome, {auth.user.name}
        </h1>
        <p className="text-gray-200 text-xl">{auth.user.email}</p>
      </div>

      {/* Centered Buttons Container */}
      <div className="guest-dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl p-6">
  <button
    className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:bg-blue-600 transition"
    onClick={() => navigate("/host/profile")}
  >
    <FaUser className="text-4xl mb-3" />
    Your Account
  </button>
  <button
    className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:bg-green-600 transition"
    onClick={() => navigate("/host/bookings")}
  >
    <FaClipboardList className="text-4xl mb-3" />
    Your Bookings
  </button>
  <button
    className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:bg-yellow-600 transition"
    onClick={() => { logout(); navigate("/") }}
  >
    <FaHome className="text-4xl mb-3" />
    Want to be a Guest?
  </button>
  
  {/* Empty placeholder for centering purposes */}
  <div className="hidden md:block"></div>
  
  {/* Centered Log Out button */}
  <button
    className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:bg-red-600 transition md:col-span-3 lg:col-span-1"
    onClick={logout}
  >
    <FaSignOutAlt className="text-4xl mb-3" />
    Log Out
  </button>
</div>

    </>
  ) : (
    <p className="text-white">Loading...</p>
  )}
</div>
    </>
  );
}

export default HostDashboard;
