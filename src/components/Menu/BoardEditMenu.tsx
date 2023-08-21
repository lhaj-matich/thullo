import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Heading,
  Checkbox,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import GenericButton from "../Button/GenericButton";
import BoardAuthor from "../Panel/BoardAuthor";
import EditDescription from "../Panel/EditDescription";
import BoardCover from "../Panel/BoardCover";
import TeamUsers from "../Panel/TeamUsers";
import { useState } from "react";
import useBoard from "../../hooks/useBoard";

const BoardEditMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { board } = useBoard();
  const [disable, setDisabled] = useState(true);

  return (
    <>
      <GenericButton text="Show Menu" icon={BsThreeDots} onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={() => {onClose(); setDisabled(true)}} size="sm">
        <DrawerOverlay />
        <DrawerContent paddingX="2px">
          <DrawerHeader>{board.title}</DrawerHeader>
          <Divider />
          <DrawerBody>
            <BoardAuthor />
            <BoardCover />
            <EditDescription />
            <TeamUsers />
          </DrawerBody>
          <DrawerFooter>
            <HStack justifyContent="center">
              <Checkbox colorScheme="gray" onChange={(e) => setDisabled(!e.target.checked)} color="#828282">
                I confirm to delete this board
              </Checkbox>
              <Button isDisabled={disable} float="left" variant="outlineRed">
                Delete Board
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BoardEditMenu;
