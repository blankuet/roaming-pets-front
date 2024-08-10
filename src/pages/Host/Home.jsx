import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/public/animals.jpg')" }}
      >
        <div
        className="flex flex-col items-center justify-center min-h-screen space-y-12">
          <div className="flex flex-col items-center justify-center min-h-screen space-y-12 bg-gray-50 bg-opacity-10">
            <h1 className="text-3xl font-bold text-white">
              Welcome to the hosting page of Roaming Pets
            </h1>

            <NavLink to="/host/signup" className="w-full flex flex-col items-center">
              <p className="text-xl text-center mt-2 uppercase">Sign up</p>
            </NavLink>
            <NavLink to="/host/login" className="w-full flex flex-col items-center">
              <p className="text-xl text-center mt-2 uppercase">Login</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
