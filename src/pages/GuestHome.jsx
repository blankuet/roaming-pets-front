import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/animals.jpg')" }}
      >
        {/* Title container */}
        <h1 className="text-4xl font-bold text-white mb-12">
          Welcome to the guest page of Roaming Pets
        </h1>

        {/* Links container */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
          {/* Left container - Sign Up */}
          <div className="flex flex-col items-center bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <p className="text-white mb-4 text-center">
              Do not have an account yet? Register here:
            </p>
            <NavLink to="/guest/signup" className="flex flex-col items-center">
              <img
                src="/src/assets/signup.png"
                alt="signup"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            </NavLink>
          </div>

          {/* Center container - Login */}
          <div className="flex flex-col items-center bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <p className="text-white mb-4 text-center">
              Do you have an account? Login here:
            </p>
            <NavLink to="/guest/login" className="flex flex-col items-center">
              <img
                src="/src/assets/login.png"
                alt="login"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            </NavLink>
          </div>

          {/* Right container - Host Profile */}
          <div className="flex flex-col items-center bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <p className="text-white mb-4 text-center">
              Do you want to make a Host profile?
            </p>
            <NavLink to="/host" className="flex flex-col items-center">
              <img
                src="/src/assets/host.png"
                alt="host"
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
