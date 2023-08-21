import { useContext } from "react";
import { BoardContext } from "../components/Contexts/boardContext";

const useBoard = () => useContext(BoardContext);

export default useBoard;