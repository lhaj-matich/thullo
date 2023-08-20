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
  Divider,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import GenericButton from "../Button/GenericButton";
import BoardAuthor from "../Panel/BoardAuthor";
import EditDescription from "../Panel/EditDescription";

const BoardEditMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <GenericButton text="Show Menu" icon={BsThreeDots} onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent paddingX="2px">
          <DrawerHeader>The amazing board</DrawerHeader>
          <Divider />
          <DrawerBody>
            <BoardAuthor />
            <EditDescription />
          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BoardEditMenu;
