import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  // const isAuthenticated = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
