import './App.css'

import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/TravelerAuthContext.jsx'
import SignUpT from './pages/traveler/SignUpT.jsx'
import LoginT from './pages/traveler/LoginT.jsx'
import DashboardT from './pages/traveler/DashboardT.jsx'
import TravelerPrivateRoute from './components/TravelerPrivateRoute.jsx'

function App() {
  return (
    <>
        <AuthProvider>
          <Routes>
            <Route path="/traveler/signup" element={<SignUpT />} />
            <Route path="/traveler/login" element={<LoginT />} /> 
            <Route path="/traveler/dashboard" element={
              <TravelerPrivateRoute>
                <DashboardT />
              </TravelerPrivateRoute>
            } />
          </Routes>
      </AuthProvider>
    </>
  )
}

export default App
