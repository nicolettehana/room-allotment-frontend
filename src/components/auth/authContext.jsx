import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = loading / checking
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const accessTokenRef = useRef(accessToken);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  // Restore session from storage when the app mounts
  useEffect(() => {
    const storedAccess = sessionStorage.getItem("access_token");
    const storedRefresh = sessionStorage.getItem("refresh_token");
    const storedUser = sessionStorage.getItem("user");

    if (storedAccess && storedRefresh && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setAccessToken(storedAccess);
        setUser(parsedUser);
      } catch (err) {
        console.warn("Failed to restore auth from storage", err);
        logout();
      }
    }

    // Mark loading as complete
    setIsAuthLoading(false);
  }, []);

  // Keep storage in sync
  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("access_token", accessToken);
    } else {
      sessionStorage.removeItem("access_token");
    }
  }, [accessToken]);

  useEffect(() => {
    if (user && user !== null) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else if (user === null && !isAuthLoading) {
      sessionStorage.removeItem("user");
    }
  }, [user, isAuthLoading]);

  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  axiosClient.interceptors.request.use((config) => {
    if (accessTokenRef.current) {
      config.headers.Authorization = `Bearer ${accessTokenRef.current}`;
    }
    return config;
  });

  // Basic 401 → logout (you can later improve with refresh token)
  // axiosClient.interceptors.response.use(
  //   (res) => res,
  //   (err) => {
  //     if (err.response?.status === 401) {
  //       logout();
  //     }
  //     return Promise.reject(err);
  //   },
  // );

  axiosClient.interceptors.response.use(
    (res) => {
      // If responseType is blob, return only the data
      if (res.config.responseType === "blob") {
        return res.data;
      }
      return res; // default: return full response
    },
    (err) => {
      if (err.response?.status === 401) {
        logout();
      }
      return Promise.reject(err);
    },
  );

  const login = (accessTokenValue, refreshTokenValue, userData) => {
    setAccessToken(accessTokenValue);
    sessionStorage.setItem("refresh_token", refreshTokenValue);
    setUser(userData); // userData must include at least { role: "..." }
    setIsAuthLoading(false);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setIsAuthLoading(false);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        accessToken,
        isAuthLoading,
        axiosClient,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
};
