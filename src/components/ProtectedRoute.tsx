"use client";

import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-[20vh] items-center justify-center">Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;