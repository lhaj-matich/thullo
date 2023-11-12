import { useQuery } from "@tanstack/react-query";
import { Box, VStack } from "@chakra-ui/react";

import apiClient from "../../services/apiClient";
import { Card } from "../../config/entities";
import ListHeader from "../Nav/ListHeader";
import BoardCard from "../Card/BoardCard";
import { List } from "../Nav/BoardSearch";
import NewCard from "../Card/NewCard";
import { Droppable } from "react-beautiful-dnd";

interface CardsListProps {
  list: List;
}

//! Should modify the generic card component to trucate text or not.
const CardsList = ({ list }: CardsListProps) => {
  const cardClient = new apiClient<Card[]>(`/lists/${list.id}/cards`);
  const { data } = useQuery<Card[]>({
    queryKey: ["lists", list.id, "cards"],
    queryFn: () => cardClient.getData().then((res: any) => res.data.cards),
    refetchOnWindowFocus: true,
  });

  return (
    <VStack alignItems="center" borderRadius={12} width="380px" padding={2}>
      <ListHeader name={list.name} id={list.id} />
      <Droppable droppableId={list.id} ignoreContainerClipping={true}>
        {(provided) => (
          <VStack ref={provided.innerRef} {...provided.droppableProps} maxHeight="67vh" overflow="auto" paddingX={3}>
            {data?.map((card, index) => (
              <BoardCard key={card.id} data={card} index={index} />
            ))}
            {provided.placeholder}
            <Box height="5px"></Box>
          </VStack>
        )}
      </Droppable>
      <NewCard listId={list.id} first={true} />
    </VStack>
  );
};

export default CardsList;
