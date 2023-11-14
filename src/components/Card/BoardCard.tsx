import { Box, useDisclosure } from "@chakra-ui/react";
import CardItem from "./CardItem";
import CardModal from "../Modal/CardModal";
import { Card } from "../../config/entities";
import { Draggable } from "react-beautiful-dnd";

interface BoardCardProps {
  data: Card;
  index: number;
  list: string;
}

const BoardCard = ({ data, index, list }: BoardCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <CardItem card={data} onClick={onOpen} />
          {isOpen && <CardModal list={list} card={data} opened={isOpen} onClose={onClose} />}
        </Box>
      )}
    </Draggable>
  );
};

export default BoardCard;
