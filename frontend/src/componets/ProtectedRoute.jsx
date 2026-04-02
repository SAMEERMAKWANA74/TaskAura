import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  
  // If no user is logged in, redirect to Signup page (per user request)
  if (!user) {
    return <Navigate to="/signup" replace />;
  }
  
  return children;
}
