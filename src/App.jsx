// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext.jsx";
// import SignUp from "./pages/Host/SignUp.jsx";
// import Login from "./pages/Host/Login.jsx";
// import Dashboard from "./pages/Host/Dashboard.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import Accommodation from "./pages/Accommodation.jsx";
// import Booking from "./pages/Booking.jsx";
// import Home from "./pages/Host/Home.jsx";
// import HostNavbar from "./components/HostNavbar.jsx";
// import GuestHome from "./pages/GuestHome.jsx";
// // import GuestNavbar from "./components/GuestNavbar.jsx";  
// // import { Navigate } from 'react-router-dom'

// function App() {
//   return (
//     <>
//       <HostNavbar />
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<GuestHome />} />
//           <Route path="/host" element={<Home />} />
//           <Route path="/host/signup" element={<SignUp />} />
//           <Route path="/host/login" element={<Login />} />
//           <Route
//             path="/host/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
//           <Route path="/accommodation" element={<Accommodation />} />
//           <Route path="/booking" element={<Booking />} />
//         </Routes>
//       </AuthProvider>
//     </>
//   );
// }

// export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import SignUp from "./pages/Host/SignUp.jsx";
import Login from "./pages/Host/Login.jsx";
import Dashboard from "./pages/Host/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Accommodation from "./pages/Accommodation.jsx";
import Booking from "./pages/Booking.jsx";
import Home from "./pages/Host/Home.jsx";
import HostNavbar from "./components/HostNavbar.jsx";
import GuestHome from "./pages/GuestHome.jsx";
import GuestNavbar from "./components/GuestNavbar.jsx"; 

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas de invitados con el GuestNavbar */}
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
          path="/accommodation"
          element={
            <>
              <GuestNavbar />
              <Accommodation />
            </>
          }
        />
        <Route
          path="/booking"
          element={
            <>
              <GuestNavbar />
              <Booking />
            </>
          }
        />

        {/* Rutas de host con el HostNavbar */}
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
        {/* Puedes añadir una ruta de redirección por defecto aquí si lo necesitas */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
