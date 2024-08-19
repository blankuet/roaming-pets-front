import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GuestProvider } from "./context/GuestContext.jsx";
import SignUp from "./pages/Host/SignUp.jsx";
import Login from "./pages/Host/Login.jsx";
import Dashboard from "./pages/Host/Dashboard.jsx";
import GuestSignUp from "./pages/guest/SignUp.jsx";
import GuestLogin from "./pages/guest/Login.jsx";
import GuestDashboard from "./pages/guest/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./pages/Host/Home.jsx";
import HostNavbar from "./components/HostNavbar.jsx";
import GuestHome from "./pages/GuestHome.jsx";
import GuestNavbar from "./components/GuestNavbar.jsx";
import AccommodationGuest from "./pages/guest/AccommodationGuest.jsx";
import AccommodationHost from "./pages/Host/AccommodationHost.jsx";
import AccommodationEditHost from "./pages/Host/AccommodationEditHost.jsx";
import HostProfile from "./pages/Host/HostProfile.jsx";
import EditProfile from "./pages/Host/EditProfile.jsx";

function App() {
  return (
    <AuthProvider>
      <GuestProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <GuestNavbar />
                <GuestHome />
              </>
            }
          />

          <Route path="/guest/accommodation" element={<AccommodationGuest />} />

          <Route
            path="/host/accommodation"
            element={
              <>
                <HostNavbar />
                <AccommodationHost />
              </>
            }
          />
          <Route
            path="/host/accommodation/edit/:accommodationId"
            element={<AccommodationEditHost />}
          />

          <Route
            path="/host"
            element={
              <>
                <HostNavbar />
                <Home />
              </>
            }
          />
          <Route
            path="/host/signup"
            element={
              <>
                <HostNavbar />
                <SignUp />
              </>
            }
          />
          <Route
            path="/host/login"
            element={
              <>
                <HostNavbar />
                <Login />
              </>
            }
          />
          <Route
            path="/host/dashboard"
            element={
              <PrivateRoute>
                <HostNavbar />
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* here we are using the routes for guest pages */}
          <Route
            path="/guest"
            element={
              <>
                <GuestNavbar />
                {/* <GuestHome /> */}
              </>
            }
          />
          <Route
            path="/guest/signup"
            element={
              <>
                <GuestNavbar />
                <GuestSignUp />
              </>
            }
          />
          <Route
            path="/guest/login"
            element={
              <>
                <GuestNavbar />
                <GuestLogin />
              </>
            }
          />
          <Route
            path="/guest/dashboard"
            element={
              <PrivateRoute>
                <GuestNavbar />
                <GuestDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </GuestProvider>
    </AuthProvider>
  );
}

export default App;
