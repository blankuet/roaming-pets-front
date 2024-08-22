import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestContext = createContext();

const GuestProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [error, setError] = useState(null); // Estado global para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setAuth({ token, user: data });
      } else {
        localStorage.removeItem('token');
        setError(data.message || 'Token verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('token');
      setError(error.message || 'An error occurred during token verification');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.authToken);
        localStorage.setItem('user', JSON.stringify(data));
        setAuth({ token: data.authToken, user: data });
        setError(null); // Limpiar errores en caso de éxito
        navigate('/guest/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred during login');
    }
  };

  const signup = async (name, lastname, email, password, pets) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, lastname, pets }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/guest/login');
        setError(null); // Limpiar errores en caso de éxito
      } else {
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred during signup');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
    setError(null); // Limpiar errores al cerrar sesión
    navigate('/guest/login');
  };

  const updateUser = async (updatedUser) => {
    console.log(updatedUser)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/guest/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });


      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const data = await response.json();
      setAuth(prevAuth => ({ ...prevAuth, user: data.user }));
      localStorage.setItem('user', JSON.stringify(data.user));
      setError(null); // Limpiar errores en caso de éxito
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.message || 'An error occurred during user update');
    }
  };

  const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/guest/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      // Si la eliminación es exitosa, actualiza el estado
      setAuth({ token: null, user: null });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/guest/login');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    setError(error.message || 'An error occurred during user deletion');
  }
};

  return (
    <GuestContext.Provider value={{ auth, login, signup, logout, deleteUser, updateUser }}>
      {children}
    </GuestContext.Provider>
  );
};

GuestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GuestContext, GuestProvider };