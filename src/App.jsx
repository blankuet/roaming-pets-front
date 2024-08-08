import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import SignUp from './pages/SignUp.jsx'
import SignUpT from './pages/traveler/SignUpT.jsx'
import Login from './pages/Login.jsx'
import LoginT from './pages/traveler/LoginT.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DashboardT from './pages/traveler/DashboardT.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
