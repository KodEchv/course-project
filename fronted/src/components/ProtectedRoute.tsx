import { Navigate, useLocation } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Rutas que requieren ser admin
const ADMIN_ROUTES = ["/configuracion", "/dashboard", "/estudiante", "/listado-estudiantes"];
// Rutas que requieren ser estudiante/usuario
const STUDENT_ROUTES = ["/modulos", "/progreso", "/contenido"];

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

  // Si hay usuario, validar rol y ruta
  try {
    const user = JSON.parse(userStr);
    const isAdmin = user.rol === "admin" || user.role === "admin" || user.ID_Persona === 1;
    const isStudent = !isAdmin;

    // Si está en login y hay usuario, redirige según rol
    if (location.pathname === "/") {
      if (isAdmin) {
        return <Navigate to="/dashboard" replace />;
      } else {
        return <Navigate to="/modulos" replace />;
      }
    }

    // Validar acceso a rutas según rol
    const isAdminRoute = ADMIN_ROUTES.some(route => location.pathname.startsWith(route));
    const isStudentRoute = STUDENT_ROUTES.some(route => location.pathname.startsWith(route));

    // Si es admin intentando acceder a ruta de estudiante
    if (isAdmin && isStudentRoute) {
      return <Navigate to="/dashboard" replace />;
    }

    // Si es estudiante intentando acceder a ruta de admin
    if (isStudent && isAdminRoute) {
      return <Navigate to="/modulos" replace />;
    }

  } catch {
    return <Navigate to="/" replace />;
  }

  // Si todo bien, muestra el contenido protegido
  return <>{children}</>;
};
