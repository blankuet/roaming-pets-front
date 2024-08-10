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
            <NavLink to="/guest/signup" className="w-full flex flex-col items-center">
              <p className="text-xl text-center uppercase text-white">Sign up</p>
            </NavLink>
          </div>
          
          <div className="flex flex-col items-center">
            <p className="text-white mb-2">Do you have an account?</p>
            <NavLink to="/guest/login" className="w-full flex flex-col items-center">
              <p className="text-xl text-center uppercase text-white">Login</p>
            </NavLink>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-white mb-2">Do you want to make a Host profile?</p>
            <NavLink to="host/" className="w-full flex flex-col items-center">
              <p className="text-xl text-center uppercase text-white">Host</p>
            </NavLink>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Home;

