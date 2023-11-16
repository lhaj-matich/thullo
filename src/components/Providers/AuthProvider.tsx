import { ReactNode, useEffect, useState } from "react";
import { AuthAction, AuthContext, UserInfo } from "../Contexts/authContext";
import apiClient from "../../services/apiClient";

interface AuthProps {
  children: ReactNode;
}

interface UserResponse {
  status: string;
  user: UserInfo;
}

const AuthProvider = ({ children }: AuthProps) => {
  const user = localStorage.getItem("user");
  const userData: UserInfo = user ? JSON.parse(user) : null;
  const [auth, setAuth] = useState<AuthAction>({ loggedIn: userData ? true : false, user: userData || null });

  console.log(userData);

  useEffect(() => {
    new apiClient<UserResponse>("/users/me").getData().then((res) => {
      setAuth({ loggedIn: true, user: res.data.user });
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }).catch(() => {
      setAuth({ loggedIn: false, user: null });
      localStorage.removeItem("user")
    });
  }, []);
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
