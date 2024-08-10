import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
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
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/create-booking" element={<Booking />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
