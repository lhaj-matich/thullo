import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, useToast } from "@chakra-ui/react";

import BoardNavBar from "../components/Nav/BoardNavBar";
import BoardHeader from "../components/Nav/BoardHeader";
import CardsList from "../components/List/CardsList";
import { Board } from "../components/Nav/BoardSearch";
import NavBar from "../components/Nav/NavBar";
import apiClient from "../services/apiClient";
import NewList from "../components/Card/NewList";
import useBoard from "../hooks/useBoard";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loader/Loading";
import { DragDropContext } from "react-beautiful-dnd";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "../config/entities";

interface BoardResponse {
  status: string;
  board: Board;
}

const BoardPage = () => {
  const boardClient = new apiClient<BoardResponse>("boards");
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setBoard, board } = useBoard();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    let destinationList = queryClient.getQueryData<Card[]>(["lists", destination.droppableId, "cards"]);
    let sourceList = queryClient.getQueryData<Card[]>(["lists", source.droppableId, "cards"]);
    // console.log(source.draggableId as string == destination.droppableId as string);
    if (source.droppableId == destination.droppableId)
      return destinationList?.splice(destination.index, 0, sourceList?.splice(source.index, 1)[0] as Card);
    const cardElement = sourceList?.find((card) => card.id === draggableId);
    queryClient.setQueryData<Card[]>(["lists", destination.droppableId, "cards"], (cards) => {
      console.log(cards);
      return cards?.splice(destination.index, 0, cardElement as Card)
    }
      
    );
    queryClient.setQueryData<Card[]>(["lists", source.droppableId, "cards"], (cards) =>
      cards?.filter((card) => card.id !== draggableId)
    );
  };

  useEffect(() => {
    boardClient
      .getData(`/${id}`)
      .then((res) => setBoard(res.data.board))
      .catch(() => {
        navigate("/");
        toast({
          position: "top-right",
          description: "You don't have enough permissions or board was deleted.",
          status: "error",
          duration: 2000,
        });
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
          <DragDropContext onDragEnd={onDragEnd}>
            {board.lists?.map((list, index) => (
              <CardsList key={index} list={list} />
            ))}
            {board.lists?.length === 0 ? (
              <NewList id={board.id} first={false} />
            ) : (
              <NewList id={board.id} first={true} />
            )}
          </DragDropContext>
        </HStack>
      </Box>
    </Box>
  );
};

export default BoardPage;
