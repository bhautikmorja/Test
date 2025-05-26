import { Route, Routes, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { useAuthContext } from "../context/authContext";
import ProtectedRoute from "../utils/ProtectedRoute";

const Router = () => {
  const { user, authTkn } = useAuthContext();
  console.log("🚀 ~ Router ~ user:", user)

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Router;