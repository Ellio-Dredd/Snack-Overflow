import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function AdminRoute({ children }) {
  const { user } = useContext(UserContext);

  // Check if user is logged in and has admin role
  
  const isAdmin = user && (user.role === 'admin' || user.isAdmin === true);

  // For debugging / check errors
  console.log('AdminRoute - User:', user);
  console.log('AdminRoute - Is admin:', isAdmin);

  if (!isAdmin) {
    return <Navigate to="/SignIn" replace />;
  }

  return children;
}