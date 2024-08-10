import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/public/animals.jpg')" }}
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Welcome to the hosting page of Roaming Pets
        </h1>
        
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center">
            <p className="text-white mb-2">Do not have an account yet? Register here:</p>
            <NavLink to="/host/signup" className="w-full flex flex-col items-center">
              <p className="text-xl text-center uppercase text-white">Sign up</p>
            </NavLink>
          </div>
          
          <div className="flex flex-col items-center">
            <p className="text-white mb-2">Do you have an account?</p>
            <NavLink to="/host/login" className="w-full flex flex-col items-center">
              <p className="text-xl text-center uppercase text-white">Login</p>
            </NavLink>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-white mb-2">Do you want to make a Guest profile?</p>
            <NavLink to="/" className="w-full flex flex-col items-center">
              <p className="text-xl text-center uppercase text-white">Guest</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

