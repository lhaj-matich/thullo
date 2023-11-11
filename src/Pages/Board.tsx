import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, useToast } from "@chakra-ui/react";

import BoardNavBar from "../components/Nav/BoardNavBar";
import BoardHeader from "../components/Nav/BoardHeader";
import CardsList from "../components/List/CardsList";
import { Board } from "../components/BoardSearch";
import NavBar from "../components/Nav/NavBar";
import apiClient from "../services/apiClient";
import NewList from "../components/NewList";
import useBoard from "../hooks/useBoard";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loader/Loading";

interface BoardResponse {
  status: string;
  board: Board;
}

const BoardPage = () => {
  const boardClient = new apiClient<BoardResponse>("boards");
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setBoard, board } = useBoard();
  const { auth } = useAuth();

  useEffect(() => {
    boardClient.getData(`/${id}`).then((res) => setBoard(res.data.board)).catch(() => {
      navigate("/");
      toast({
        position: 'top-right',
        description: "You don't have enough permissions or board was deleted.",
        status: 'error',
        duration: 2000,
      })
    });
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <Loading />;
  if (!auth.loggedIn) return <Navigate to="/login" />;
  return (
    <Box backgroundColor="#fff">
      <NavBar>
        <BoardHeader name={board.title} />
      </NavBar>
      <BoardNavBar />
      <Box minHeight="80vh" paddingY={3} paddingX={6}>
        <HStack
          gap={4}
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
