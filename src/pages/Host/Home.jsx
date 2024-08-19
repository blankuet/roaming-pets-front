// import { NavLink } from "react-router-dom";

// function Home() {
//   return (
//     <>
//       <div
//         className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
//         style={{ backgroundImage: "url('/public/animals.jpg')" }}
//       >
//         <h1 className="text-3xl font-bold text-white mb-6">
//           Welcome to the hosting page of Roaming Pets
//         </h1>

//         <div className="flex flex-col items-center space-y-6">
//           <div className="flex flex-col items-center">
//             <p className="text-white mb-2">Do not have an account yet? Register here:</p>
//             <NavLink to="/host/signup" className="w-full flex flex-col items-center">
//               <img src="/src/assets/signup.png" alt="signup" className="w-16 h-16 rounded-full object-cover mb-4" />
//             </NavLink>
//           </div>

//           <div className="flex flex-col items-center">
//             <p className="text-white mb-2">Do you have an account? Login here:</p>
//             <NavLink to="/host/login" className="w-full flex flex-col items-center">
//               <img src="/src/assets/login.png" alt="login" className="w-16 h-16 rounded-full object-cover mb-4" />
//             </NavLink>
//           </div>
//           <div className="flex flex-col items-center">
//             <p className="text-white mb-2">Do you want to make a Guest profile?</p>
//             <NavLink to="/" className="w-full flex flex-col items-center">
//               <img src="/src/assets/guest.png" alt="login" className="w-16 h-16 rounded-full object-cover mb-4" />
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;

import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center flex flex-col"
        style={{ backgroundImage: "url('/public/animals.jpg')" }}
      >
        {/* Contenedor para el título */}
        <h1 className="text-3xl font-bold text-white mt-6 mx-auto">
          Welcome to the hosting page of Roaming Pets
        </h1>

        {/* Contenedor para los enlaces */}
        <div className="flex justify-between items-start w-full px-8 mt-20">
          {/* Contenedor izquierda */}
          <div className="space-y-6">
            <div className="flex flex-col items-center bg-black bg-opacity-70 p-4 rounded">
              <p className="text-white mb-2">
                Do not have an account yet? Register here:
              </p>
              <NavLink
                to="/host/signup"
                className="w-full flex flex-col items-center"
              >
                <img
                  src="/src/assets/signup.png"
                  alt="signup"
                  className="w-16 h-16 rounded-full object-cover mb-4"
                />
              </NavLink>
            </div>

            <div className="flex flex-col items-center bg-black bg-opacity-70 p-4 rounded">
              <p className="text-white mb-2">
                Do you have an account? Login here:
              </p>
              <NavLink
                to="/host/login"
                className="w-full flex flex-col items-center"
              >
                <img
                  src="/src/assets/login.png"
                  alt="login"
                  className="w-16 h-16 rounded-full object-cover mb-4"
                />
              </NavLink>
            </div>
          </div>

          {/* Contenedor derecha */}
          <div className="flex flex-col items-center bg-black bg-opacity-70 p-4 rounded mt-20">
            <p className="text-white mb-2">
              Do you want to make a Guest profile?
            </p>
            <NavLink to="/" className="w-full flex flex-col items-center">
              <img
                src="/src/assets/guest.png"
                alt="guest"
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
