import { Box, HStack } from "@chakra-ui/react";
import NavBar from "../components/Nav/NavBar";
import BoardNavBar from "../components/Nav/BoardNavBar";
import BoardHeader from "../components/Nav/BoardHeader";
import useBoard from "../hooks/useBoard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import apiClient from "../services/apiClient";
import { Board } from "../components/BoardSearch";
import CardsList from "../components/List/CardsList";
import InsertButton from "../components/Button/InsertButton";
import NewList from "../components/NewList";

interface BoardResponse {
  status: string;
  board: Board;
}

const BoardPage = () => {
  const boardClient = new apiClient<BoardResponse>("boards");
  const { id } = useParams();
  const { setBoard, board } = useBoard();

  //! We gonna need custom scroll bars in the lists container
  useEffect(() => {
    boardClient.getData(`/${id}`).then((res) => setBoard(res.data.board));
  }, []);

  return (
    <Box backgroundColor="#fff">
      <NavBar>
        <BoardHeader name={board.title} />
      </NavBar>
      <BoardNavBar />
      <Box minHeight="80vh" paddingY={3} paddingX={6}>
        <HStack
          gap={3}
          alignItems="flex-start"
          padding={3}
          paddingX={6}
          backgroundColor="#F8F9FD"
          borderRadius="24px"
          overflowX="scroll"
          height="82vh"
        >
          {board.lists?.map((list, index) => (
            <CardsList key={index} list={list} />
          ))}
          {board.lists?.length === 0 ? <NewList id={board.id} first={false} /> : <NewList id={board.id} first={true} />}
        </HStack>
      </Box>
    </Box>
  );
};

export default BoardPage;
