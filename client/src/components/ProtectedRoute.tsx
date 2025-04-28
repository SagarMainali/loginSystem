import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "./modal/Modal";

const ProtectedRoute = () => {

  const { user, token, modal: { message } } = useSelector((state: RootState) => state.auth);

  if (user && token) {
    return <Outlet />;
  }

  if (message) {
    return <div className="relative h-screen">
      <Modal name='message' />
    </div>
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
