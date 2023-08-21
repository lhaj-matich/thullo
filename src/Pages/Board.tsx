import { Center, VStack } from "@chakra-ui/react";
import NavBar from "../components/Nav/NavBar";
import BoardNavBar from "../components/Nav/BoardNavBar";
import BoardHeader from "../components/Nav/BoardHeader";
import useBoard from "../hooks/useBoard";
import { useParams } from "react-router-dom";
import BoardProvider from "../components/Providers/BoardProvider";
import { useEffect } from "react";
import apiClient from "../services/apiClient";
import { Board } from "../components/BoardSearch";

interface BoardResponse {
  status: string;
  board: Board;
}

const BoardPage = () => {
  const boardClient = new apiClient<BoardResponse>("boards");
  const { id } = useParams();
  const { setBoard, board } = useBoard();

  useEffect(() => {
    boardClient.getData(`/${id}`).then((res) => setBoard(res.data.board));
  }, []);
  
  return (
    <>
      <NavBar>
        <BoardHeader name={board.title} />
      </NavBar>
      <BoardNavBar />
      <Center paddingTop={5}>
        <VStack></VStack>
      </Center>
    </>
  );
};

export default BoardPage;
