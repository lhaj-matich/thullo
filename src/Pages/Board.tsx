import { Center, VStack, Box } from "@chakra-ui/react";
import NavBar from "../components/Nav/NavBar";
import BoardNavBar from "../components/Nav/BoardNavBar";
import BoardHeader from "../components/Nav/BoardHeader";
import useBoard from "../hooks/useBoard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import apiClient from "../services/apiClient";
import { Board } from "../components/BoardSearch";
import ListHeader from "../components/Nav/ListHeader";
import InsertCard from "../components/Card/InsertCard";
import CardsList from "../components/List/CardsList";

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
    <Box backgroundColor="#fff">
      <NavBar>
        <BoardHeader name={board.title} />
      </NavBar>
      <BoardNavBar />
      <Box minHeight="80vh" width="100%" padding={6}>
        <Box padding={3} paddingX={6} backgroundColor="#F8F9FD" borderRadius="24px" height="75vh">
          <CardsList />
        </Box>
        {/* <Labels /> */}
        {/* <InsertButton /> */}
      </Box>
    </Box>
  );
};

export default BoardPage;
