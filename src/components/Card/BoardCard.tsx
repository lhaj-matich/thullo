import { Box, useDisclosure } from "@chakra-ui/react";
import CardItem from "./CardItem";
import CardModal from "../Modal/CardModal";
import { Card } from "../../config/entities";

interface BoardCardProps {
  data: Card;
}

const BoardCard = ({ data }: BoardCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <CardItem card={data} onClick={onOpen} />
      {isOpen && <CardModal opened={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default BoardCard;
