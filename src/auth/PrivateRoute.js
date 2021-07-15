import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export default function PrivateRoute({ path, ...props }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
