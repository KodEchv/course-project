import { Navigate, useLocation } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}


export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userStr = localStorage.getItem("user");
  const location = useLocation();

  // Si no hay usuario, solo puede acceder al login
  if (!userStr) {
    // Si intenta acceder a una ruta protegida, redirige al login
    if (location.pathname !== "/") {
      return <Navigate to="/" replace />;
    }
    // Si está en login, permite
    return <>{children}</>;
  }

  // Si hay usuario y está en login, redirige según rol
  try {
    const user = JSON.parse(userStr);
    if (location.pathname === "/") {
      if (user.rol === "admin" || user.role === "admin") {
        return <Navigate to="/dashboard" replace />;
      } else {
        return <Navigate to="/modulos" replace />;
      }
    }
  } catch {
    return <Navigate to="/" replace />;
  }

  // Si todo bien, muestra el contenido protegido
  return <>{children}</>;
};
