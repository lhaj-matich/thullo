import { Box, useDisclosure } from "@chakra-ui/react";
import CardItem from "./CardItem";
import CardModal from "../Modal/CardModal";
import { Card } from "../../config/entities";
import { Draggable } from "react-beautiful-dnd";

interface BoardCardProps {
  data: Card;
  index: number;
}

const BoardCard = ({ data, index }: BoardCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <CardItem card={data} onClick={onOpen} />
          {isOpen && <CardModal card={data} opened={isOpen} onClose={onClose} />}
        </Box>
      )}
    </Draggable>
  );
};

export default BoardCard;
