import { HStack, Text, VStack } from "@chakra-ui/react";
import GenericCard from "../Card/GenericCard";
import ListHeader from "../Nav/ListHeader";
import LabelsList from "./LabelsList";
import UserGroupList from "./UserGroupList";
import useBoard from "../../hooks/useBoard";
import InsertButton from "../Button/InsertButton";
import NumberBadge from "../NumberBadge";
import { MdInsertComment, MdAttachFile } from "react-icons/md";
import CardItem from "../Card/CardItem";
import BoardCard from "../Card/BoardCard";

//! Should modify the generic card component to trucate text or not.

const CardsList = () => {
  const { board } = useBoard();
  return (
    <VStack alignItems="center" width="330px">
      <ListHeader />
      <VStack>
        <BoardCard />
        <InsertButton />
      </VStack>
    </VStack>
  );
};

export default CardsList;
