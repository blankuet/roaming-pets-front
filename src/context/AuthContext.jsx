import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [test, setTest] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/host/verify`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      console.log(data, token);
      if (response.ok) {
        setAuth({ token, user: data });
        setTest("hola");
        console.log(test);
        console.log(auth.token);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error:", error);
      localStorage.removeItem("token");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/host/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("user", JSON.stringify(data));
        setAuth({ token: data.authToken, user: data });
        console.log(auth);
        navigate("/host/dashboard");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/host/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate("/host/login");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
    navigate("/host/login");
  };

  const updateUser = async (updatedUser) => {
    console.log(updatedUser);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/host/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      setAuth((prevAuth) => ({ ...prevAuth, user: data.user }));
      console.log("updationg: ", data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/host/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        // Si la eliminación es exitosa, actualiza el estado
        setAuth({ token: null, user: null });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/host/login");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, signup, logout, deleteUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };

/* import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType'); // Store user type (host or guest)
    if (token) {
      if (userType === 'host') {
        verifyHostToken(token);
        setIsHost(true);
      } else if (userType === 'guest') {
        verifyGuestToken(token);
        setIsHost(false);
      }
    }
  }, []);

  const verifyHostToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5005/auth/host/verify', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setAuth({ token, user: data });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
      }
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }
  };

  const verifyGuestToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5005/auth/guest/verify', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setAuth({ token, user: data });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
      }
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }
  };

  const login = async (email, password, userType) => {
    try {
      const url = userType === 'host' 
        ? 'http://localhost:5005/auth/host/login'
        : 'http://localhost:5005/auth/guest/login';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.authToken);
        localStorage.setItem('userType', userType); // Save user type
        setAuth({ token: data.authToken, user: data });
        setIsHost(userType === 'host');
        navigate(userType === 'host' ? '/host/dashboard' : '/guest/dashboard');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const signup = async (name, email, password, userType) => {
    try {
      const url = userType === 'host' 
        ? 'http://localhost:5005/auth/host/signup'
        : 'http://localhost:5005/auth/guest/signup';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate(userType === 'host' ? '/host/login' : '/guest/login');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setAuth({ token: null, user: null });
    navigate(isHost ? '/host/login' : '/guest/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout, isHost }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider }; */
