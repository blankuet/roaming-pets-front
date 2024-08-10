import { NavLink } from "react-router-dom";
import HomeIcon from "/public/Home.jpg";

function GuestNavbar() {
  return (
    <nav className="bg-black shadow-md py-4 px-6 flex items-center">
      <NavLink to="/" className="flex items-center">
        <img src={HomeIcon} alt="Home" className="h-10" />
      </NavLink>

      <div className="ml-auto flex space-x-4">
        <NavLink
          to="guest/signup"
          className={({ isActive }) =>
            `text-lg ${isActive ? "text-indigo-600" : "text-slate-200"}`
          }
        >
          Sign Up
        </NavLink>
        <NavLink
          to="guest/login"
          className={({ isActive }) =>
            `text-lg ${isActive ? "text-indigo-600" : "text-slate-200"}`
          }
        >
          Login
        </NavLink>
      </div>
    </nav>
  )
}

export default GuestNavbar

// Hacer éste Navbar dinámico como el HostNavbar