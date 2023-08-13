import { useContext } from "react";
import { AuthContext } from "../components/Contexts/authContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;