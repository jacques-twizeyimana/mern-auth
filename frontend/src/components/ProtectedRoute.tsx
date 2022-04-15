import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../store/usercontext";

interface IProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
  const { user } = useContext(UserContext);

  if (user && user._id) return <div>{children}</div>;
  else return <Navigate to="/auth/login" replace />;
}
