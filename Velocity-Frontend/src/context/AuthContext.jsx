import {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/getUser`,
        {
          withCredentials: true,
        }
      );

      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      // Remove user from React state
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};