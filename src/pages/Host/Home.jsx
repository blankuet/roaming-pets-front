import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/animals.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#F0F0F0",
        }}
      >
        {/* Contenedor para el título */}
        <h1 className="text-4xl font-bold text-white mb-12">
          Welcome to the hosting page of Roaming Pets
        </h1>

        {/* Contenedor para los enlaces */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
          {/* Contenedor izquierda */}
          <div className="flex flex-col items-center bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <p className="text-white mb-4 text-center">
              Do not have an account yet? Register here:
            </p>
            <NavLink to="/host/signup" className="flex flex-col items-center">
              <img
                src="/signup.png"
                alt="signup"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            </NavLink>
          </div>

          {/* Contenedor central */}
          <div className="flex flex-col items-center bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <p className="text-white mb-4 text-center">
              Do you have an account? Login here:
            </p>
            <NavLink to="/host/login" className="flex flex-col items-center">
              <img
                src="/login.png"
                alt="login"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            </NavLink>
          </div>

          {/* Contenedor derecha */}
          <div className="flex flex-col items-center bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <p className="text-white mb-4 text-center">
              Do you want to make a Guest profile?
            </p>
            <NavLink to="/" className="flex flex-col items-center">
              <img
                src="/guest.png"
                alt="guest"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
