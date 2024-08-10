import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Accommodation from "./pages/Accommodation.jsx";
import Booking from "./pages/Booking.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/create-booking" element={<Booking />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
