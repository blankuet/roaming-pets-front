import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestContext = createContext();

const GuestProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5005/auth/verify', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setAuth({ token, user: data });
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('token');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5005/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.authToken);
        setAuth({ token: data.authToken, user: data });
        console.log(data)
        navigate('/guest/dashboard');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const signup = async (name, email, password, pets) => {
    try {
      const response = await fetch('http://localhost:5005/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, pets }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/guest/login');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    navigate('/guest/login');
  };

  return (
    <GuestContext.Provider value={{ auth, login, signup, logout }}>
      {children}
    </GuestContext.Provider>
  );
};

GuestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GuestContext, GuestProvider };