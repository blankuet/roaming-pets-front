import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
// import { Navigate } from 'react-router-dom'
import SignUp from './pages/Host/SignUp.jsx'
import Login from './pages/Host/Login.jsx'
import Dashboard from './pages/Host/Dashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Home from './pages/Host/Home.jsx'
import Navbar from './components/Navbar.jsx'

function App() {

  return (
    <>
    <Navbar />
      <AuthProvider>
          <Routes>
            <Route path="/host" element={<Home />} />
            <Route path="/host/signup" element={<SignUp />} />
            <Route path="/host/login" element={<Login />} />
            <Route path="/host/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          </Routes>
      </AuthProvider>
    </>
  )
}

export default App;
