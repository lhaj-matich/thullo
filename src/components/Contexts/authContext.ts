import { createContext } from "react";

export interface UserInfo {
  fullname: string;
  profileImage: string;
  email: string
}

export interface AuthAction {
  loggedIn: boolean;
  token: string | null;
  user: UserInfo | null;
}

type DispatchAuth = React.Dispatch<React.SetStateAction<AuthAction>>;

interface AuthContextType {
  auth: AuthAction;
  setAuth: DispatchAuth;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
