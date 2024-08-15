import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { NavLink } from "react-router-dom";

function Dashboard() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate hook to redirect

  useEffect(() => {
    if (!auth.user) {
      navigate("/host/login"); // Redirect to login if not authenticated
    }
  }, [auth.user, navigate]);

  return (
    <div
      className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/animals.jpg')" }}
    >
      {auth.user ? (
        <>
          <h1 className="text-5xl font-bold text-white text-center mb-6 w-full">
            Welcome, {auth.user.name}
          </h1>
          {/* Logout button */}
          <button
            onClick={logout}
            className="text-xl text-center uppercase text-white mt-6"
          >
            Logout
          </button>
          <NavLink
            to="/host/profile"
            className="w-full flex flex-col items-center"
          >
            <p className="text-xl text-center uppercase text-white">Profile</p>
          </NavLink>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
