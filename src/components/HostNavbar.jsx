import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import HomeIcon from "/public/Home.jpg";
import { useNavigate } from "react-router-dom";

function HostNavbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth state changed:", auth);
  }, [auth]);

  return (
    <nav className="bg-black shadow-md py-4 px-6 flex items-center justify-between">
      {/* Icono de Home */}
      {!auth.user ? (
        <NavLink to="/host/" className="flex items-center">
          <img src={HomeIcon} alt="Home" className="h-10" />
        </NavLink>
      ) : (
        <NavLink to="/host/dashboard" className="flex items-center">
          <img src={HomeIcon} alt="Home" className="h-10" />
        </NavLink>
      )}

      {/* Enlaces centrados para usuarios autenticados */}
      {auth.user && (
        <div className="flex-1 flex justify-center space-x-4">
          <NavLink
            to="/host/accommodation"
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-indigo-600" : "text-slate-200"}`
            }
          >
            Accommodations
          </NavLink>
          <NavLink
            to="/host/bookings"
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-indigo-600" : "text-slate-200"}`
            }
          >
            Bookings
          </NavLink>
        </div>
      )}

      {/* Enlaces de Signup/Login o Logout a la derecha */}
      <div className="ml-auto flex space-x-4">
        {!auth.user ? (
          <>
            <NavLink
              to="/host/signup"
              className={({ isActive }) =>
                `text-lg ${isActive ? "text-indigo-600" : "text-slate-200"}`
              }
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/host/login"
              className={({ isActive }) =>
                `text-lg ${isActive ? "text-indigo-600" : "text-slate-200"}`
              }
            >
              Login
            </NavLink>
          </>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="text-lg text-slate-200 hover:text-indigo-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default HostNavbar;
