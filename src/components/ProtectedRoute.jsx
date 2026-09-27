import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "@/api/axios";
import { storeSession, dashboardPath } from "@/lib/session";

export default function RoleProtectedRoute({ allowedRole, children }) {
  const [identity, setIdentity] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    api.get("me/").then(({ data }) => {
      if (active) { storeSession(data); setIdentity(data); }
    }).catch((failure) => {
      if (active) setError(failure.response?.status === 401 ? "unauthorized" : "Unable to verify your session. Please try again.");
    });
    return () => { active = false; };
  }, [attempt]);
  if (!localStorage.getItem("access") && !localStorage.getItem("refresh")) return <Navigate to="/login" replace />;
  if (error === "unauthorized") return <Navigate to="/login" replace />;
  if (error) return <div role="alert" className="p-8">{error}<button className="ml-4 underline" onClick={() => { setError(""); setAttempt(attempt + 1); }}>Retry</button></div>;
  if (!identity) return <p role="status" className="p-8">Checking your session...</p>;
  const allowed = allowedRole === "admin" ? identity.is_admin === true : identity.role === allowedRole;
  if (!allowed) return <Navigate to={dashboardPath(identity)} replace />;
  return children;
}
