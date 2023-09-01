import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  Checkbox,
  HStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import GenericButton from "../Button/GenericButton";
import BoardAuthor from "../Panel/BoardAuthor";
import EditDescription from "../Panel/EditDescription";
import BoardCover from "../Panel/BoardCover";
import TeamUsers from "../Panel/TeamUsers";
import { useState } from "react";
import useBoard from "../../hooks/useBoard";
import apiClient from "../../services/apiClient";
import useAuth from "../../hooks/useAuth";
import EditTitle from "../EditTitle";

const BoardEditMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useAuth();
  const toast = useToast({ duration: 2000, position: "top-right", status: "error" });
  const { board, setBoard } = useBoard();
  const [disable, setDisabled] = useState(true);

  // Logic for change the board description.
  const boardClient = new apiClient(`boards/${board.id}`);

  const updateBoardDescription = (value: string) => {
    boardClient
      .updateData({ description: value }, null)
      .then(() => {
        setBoard({ ...board, description: value });
      })
      .catch((e) => toast({ description: e.response.data.message }));
  };

  return (
    <>
      <GenericButton text="Show Menu" icon={BsThreeDots} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          onClose();
          setDisabled(true);
        }}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent paddingX="2px">
          <DrawerHeader>
            <EditTitle title={board.title} edit={true} clickCB={() => console.log("Edit title")} />
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <BoardAuthor />
            <BoardCover edit={auth.user?.id === board.authorId} />
            <EditDescription
              edit={auth.user?.id === board.authorId}
              description={board.description}
              clickCB={(value) => updateBoardDescription(value)}
              height="300px"
            />
            <TeamUsers edit={auth.user?.id === board.authorId} />
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
