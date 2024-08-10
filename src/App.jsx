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
import Accommodation from "./pages/Accommodation.jsx";
import Booking from "./pages/Booking.jsx";
import Home from "./pages/Host/Home.jsx";
import Navbar from "./components/Navbar.jsx";
// import { Navigate } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <AuthProvider>
        <GuestProvider>
        <Routes>
          <Route path="/host" element={<Home />} />
          <Route path="/host/signup" element={<SignUp />} />
          <Route path="/host/login" element={<Login />} />
          <Route
            path="/host/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/guest/signup" element={<GuestSignUp />} />
          <Route path="/guest/login" element={<GuestLogin />} />
          <Route
            path="/guest/dashboard"
            element={
              <PrivateRoute>
                <GuestDashboard />
              </PrivateRoute>
            }
          />
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        </GuestProvider>
      </AuthProvider>
    </>
  );
}

export default App;
