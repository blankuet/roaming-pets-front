import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/host/verify`, {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/host/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        localStorage.setItem('token', data.authToken);
        localStorage.setItem('user', JSON.stringify(data));
        setAuth({ token: data.authToken, user: data });
        console.log(auth)
        navigate('/host/dashboard');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/host/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/host/login');
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
    navigate('/host/login');
  };

  const updateUser = async (updatedUser) => {
    console.log(updatedUser)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/host/update`, {
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
      console.log('updationg: ', data.user)
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/host/delete`, {
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
      navigate('/host/login');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout, deleteUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
