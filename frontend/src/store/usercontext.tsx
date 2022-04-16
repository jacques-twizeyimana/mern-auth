import { createContext, useState } from "react";
import { LoginRes } from "../types/services/auth.types";
import { UserInfo } from "../types/services/users.types";

interface IProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  user: UserInfo | undefined;
  login: (data: LoginRes) => void;
  updateUser: (data: UserInfo) => void;
  logout: () => void;
}

const UserContext = createContext({} as IUserContext);

function getUserFromSessionStorage() {
  const jwt_info: LoginRes = JSON.parse(
    localStorage.getItem("auth_token") || "{}"
  );
  const user = jwt_info.user;
  return user?._id ? user : undefined;
}

export function UserContextProvider({ children }: IProviderProps) {
  const [user, setuser] = useState(getUserFromSessionStorage());

  const login = (newJWTInfo: LoginRes) => {
    localStorage.setItem("auth_token", JSON.stringify(newJWTInfo || {}));
    setuser(newJWTInfo.user);
  };

  const updateUser = (newUser: UserInfo) => {
    setuser(newUser);
  };

  const logout = () => {
    setuser(undefined);
    localStorage.removeItem("auth_token");
    window.location.pathname = "/auth/login";
  };

  return (
    <UserContext.Provider value={{ user, updateUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
