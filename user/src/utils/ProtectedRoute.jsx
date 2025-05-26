import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user, authTkn } = useAuthContext();
  console.log("🚀 ~ ProtectedRoute ~ user:", user)
  console.log("🚀 ~ ProtectedRoute ~ authTkn:", authTkn)

  if (user ) {
    console.log("first")
    return children;
  }

  return <h1>Not Authenticated</h1>
};

export default ProtectedRoute;