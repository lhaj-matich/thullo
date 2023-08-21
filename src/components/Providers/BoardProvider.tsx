import { ReactNode, useState } from "react";
import { BoardContext } from "../Contexts/boardContext";
import { Board } from "../BoardSearch";

interface BoardProps {
  children: ReactNode;
}

const BoardProvider = ({ children }: BoardProps) => {
  const [board, setBoard] = useState<Board>({ title: "", visibility: false, coverImage: "" });
  return <BoardContext.Provider value={{ board, setBoard }}>{children}</BoardContext.Provider>;
};

export default BoardProvider;
