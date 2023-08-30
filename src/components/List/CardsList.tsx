import { useQuery } from "@tanstack/react-query";
import { VStack } from "@chakra-ui/react";

import apiClient from "../../services/apiClient";
import { Card } from "../../config/entities";
import ListHeader from "../Nav/ListHeader";
import BoardCard from "../Card/BoardCard";
import { List } from "../BoardSearch";
import NewCard from "../NewCard";

interface CardsListProps {
  list: List;
}

//! Should modify the generic card component to trucate text or not.
//! Trying to optimize the loading of the cards and the card modal.
const CardsList = ({ list }: CardsListProps) => {
  const cardClient = new apiClient<Card[]>(`/lists/${list.id}/cards`);
  const { data } = useQuery<Card[]>({
    queryKey: ["cards", list.id],
    queryFn: () => cardClient.getData().then((res: any) => res.data.cards),
  });

  return (
    <VStack alignItems="center" borderRadius={12} width="380px" padding={2}>
      <ListHeader name={list.name} id={list.id} />
      <VStack maxHeight="67vh" overflow="auto" paddingX={3}>
        {data?.map((card, index) => <BoardCard key={index} data={card} />)}
      </VStack>
      <NewCard listId={list.id} first={true} />
    </VStack>
  );
};

export default CardsList;
