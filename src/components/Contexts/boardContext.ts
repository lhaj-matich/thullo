import { createContext } from 'react';
import { Board } from '../BoardSearch';

type DispatchBoard = React.Dispatch<React.SetStateAction<Board>>;

interface BoardContextType {
  board: Board;
  setBoard: DispatchBoard;
}

export const BoardContext = createContext<BoardContextType>({} as BoardContextType);
