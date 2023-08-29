import { Box, useDisclosure } from "@chakra-ui/react";
import CardItem from "./CardItem";
import CardModal from "../Modal/CardModal";

const BoardCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <CardItem onClick={onOpen} />
      {isOpen && <CardModal opened={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default BoardCard;
