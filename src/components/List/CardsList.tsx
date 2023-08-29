import {  VStack } from "@chakra-ui/react";

import ListHeader from "../Nav/ListHeader";
import InsertButton from "../Button/InsertButton";
import { List } from "../BoardSearch";

interface CardsListProps {
  list: List;
}
//! Should modify the generic card component to trucate text or not.
//! Trying to optimize the loading of the cards and the card modal.
const CardsList = ({list}: CardsListProps) => {
  return (
    <VStack alignItems="center" borderRadius={12} width="380px" padding={2}>
      <ListHeader name={list.name} id={list.id} />
      <VStack maxHeight="67vh" overflow="auto" paddingX={3}>
      </VStack>
      <InsertButton text="Add another card"/>
    </VStack>
  );
};

export default CardsList;
