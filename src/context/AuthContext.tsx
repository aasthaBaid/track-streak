import React, { useEffect, useState, createContext, useContext } from "react";
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../services/authService";
interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await registerUser(name, email, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    error
  }}>
      {children}
    </AuthContext.Provider>;
};