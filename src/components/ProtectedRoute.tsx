import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    isAuthenticated,
    isLoading
  } = useAuth();
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;