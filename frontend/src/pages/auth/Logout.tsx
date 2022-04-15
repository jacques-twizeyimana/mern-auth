import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../store/usercontext";

export default function Logout() {
  const { logout } = useContext(UserContext);

  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/auth/login" replace />;
}
