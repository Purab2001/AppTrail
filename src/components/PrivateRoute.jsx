import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading label="Checking your account…" />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
