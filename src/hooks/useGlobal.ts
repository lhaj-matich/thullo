import { useContext } from "react";
import { GlobalContext } from "../components/Contexts/globalContext";

const useGlobal = () => useContext(GlobalContext);

export default useGlobal;