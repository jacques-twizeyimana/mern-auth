import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import UserContext from "../store/usercontext";

interface IProps {
  path: string;
  element: JSX.Element;
  index?: boolean;
}

export default function ProtectedRoute({
  path,
  element,
  index = false,
}: IProps) {
  const { user } = useContext(UserContext);

  if (user && user._id)
    return <Route path={path} index={index} element={element} />;
  else return <Navigate to="/auth/login" replace />;
}
