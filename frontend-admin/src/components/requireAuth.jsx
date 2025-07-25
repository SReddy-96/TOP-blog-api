import { Navigate, useLocation } from "react-router-dom";

// using token to see if the user is logged in, redirects to login page if not
export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
