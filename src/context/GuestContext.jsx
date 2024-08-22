import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const GuestContext = createContext();

const GuestProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch("http://localhost:5005/auth/verify", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setAuth({ token, user: data });
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
      const response = await fetch("http://localhost:5005/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.authToken);
        setAuth({ token: data.authToken, user: data });
        console.log(data);
        navigate("/guest/dashboard");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signup = async (name, email, password, pets) => {
    try {
      const response = await fetch("http://localhost:5005/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, pets }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/guest/login");
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
    navigate("/guest/login");
  };

  const updateUser = async (updatedUser) => {
    console.log(updatedUser);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/guest/update`,
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
        `${import.meta.env.VITE_API_URL}/auth/guest/delete`,
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
        navigate("/guest/login");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <GuestContext.Provider
      value={{ auth, login, signup, logout, deleteUser, updateUser }}
    >
      {children}
    </GuestContext.Provider>
  );
};

GuestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GuestContext, GuestProvider };
