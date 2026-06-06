import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRole, children }) => {
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    if (role === "employer") {
      return <Navigate to="/employer/dashboard" replace />;
    }

    if (role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;