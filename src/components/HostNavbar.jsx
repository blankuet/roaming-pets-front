// import { NavLink } from "react-router-dom";
// import HomeIcon from "/public/Home.jpg";

// function HostNavbar() {
//   return (
//     <nav className="bg-black shadow-md py-4 px-6 flex items-center">
//       <NavLink to="/host/" className="flex items-center">
//         <img src={HomeIcon} alt="Home" className="h-10" />
//       </NavLink>

//       <div className="ml-auto flex space-x-4">
//         <NavLink
//           to="/host/signup"
//           className={({ isActive }) =>
//             `text-lg ${isActive ? "text-indigo-600" : "text-slate-200"}`
//           }
//         >
//           Sign Up
//         </NavLink>
//         <NavLink
//           to="/host/login"
//           className={({ isActive }) =>
//             `text-lg ${isActive ? "text-indigo-600" : "text-slate-200"}`
//           }
//         >
//           Login
//         </NavLink>
//       </div>
//     </nav>
//   )
// }

// export default HostNavbar

import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; 
import HomeIcon from "/public/Home.jpg";

function HostNavbar() {
  const { auth, logout } = useContext(AuthContext); // Usa 'auth' en lugar de 'user'

  useEffect(() => {
    console.log('Auth state changed:', auth);
  }, [auth]);

  return (
    <nav className="bg-black shadow-md py-4 px-6 flex items-center">
      <NavLink to="/host/" className="flex items-center">
        <img src={HomeIcon} alt="Home" className="h-10" />
      </NavLink>

      <div className="ml-auto flex space-x-4">
        {!auth.user ? ( // Comprueba 'auth.user' en lugar de 'user'
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
          <>
            <NavLink
              to="/host/dashboard"
              className={({ isActive }) =>
                `text-lg ${isActive ? "text-indigo-600" : "text-slate-200"}`
              }
            >
              Dashboard
            </NavLink>
            <button
              onClick={logout}
              className="text-lg text-slate-200 hover:text-indigo-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default HostNavbar;
