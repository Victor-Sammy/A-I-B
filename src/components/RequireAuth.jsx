import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return;

  if (!user) {
    return <Navigate to="/signin" state={{ path: location.pathname }} />;
  }
  return children;
};
