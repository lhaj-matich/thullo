import { ReactNode, useEffect, useState } from "react";
import { AuthAction, AuthContext, UserInfo } from "../Contexts/authContext";
import apiClient from "../../services/apiClient";

interface AuthProps {
  children: ReactNode;
}

interface UserResponse {
  status: string;
  user: UserInfo
}

const AuthProvider = ({ children }: AuthProps) => {
  const [auth, setAuth] = useState<AuthAction>({ loggedIn: false, token: null, user: null });
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!auth.loggedIn)
    new apiClient<UserResponse>("/users/me").getData().then((res) => {
      if (token) setAuth({ loggedIn: true, token, user: res.data.user });
    });
  }, []);
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
