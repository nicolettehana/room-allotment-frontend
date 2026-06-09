import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { role, isLoading } = useAuth();

  if (isLoading) return null;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
