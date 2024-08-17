import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GuestProvider } from "./context/GuestContext.jsx";
import SignUp from "./pages/Host/SignUp.jsx";
import Login from "./pages/Host/Login.jsx";
import Dashboard from "./pages/Host/Dashboard.jsx";
// import GuestSignUp from "./pages/guest/SignUp.jsx";
// import GuestLogin from "./pages/guest/Login.jsx";
// import GuestDashboard from "./pages/guest/Dashboard.jsx"; 
import PrivateRoute from "./components/PrivateRoute.jsx";
import Accommodation from "./pages/Accommodation.jsx";
import Booking from "./pages/Booking.jsx";
import Home from "./pages/Host/Home.jsx";
import HostNavbar from "./components/HostNavbar.jsx";
import GuestHome from "./pages/GuestHome.jsx";
import GuestNavbar from "./components/GuestNavbar.jsx"; 
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
        <Route
          path="guest/accommodation"
          element={
            <>
              <GuestNavbar />
              <Accommodation />
            </>
          }
        />
        <Route
          path="guest/booking"
          element={
            <>
              <GuestNavbar />
              <Booking />
            </>
          }
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
        <Route
          path="/host/profile"
          element={
            <PrivateRoute>
              <HostNavbar />
              <HostProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/edit-profile"
          element={
            <PrivateRoute>
              <HostNavbar />
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
      </GuestProvider>
    </AuthProvider>
  );
}

export default App;

