import { Menu, MenuButton, MenuList, Button, Box, Heading, HStack, Text, Icon, useToast } from "@chakra-ui/react";
import { IoMdLock } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import VisibilityMenuItem from "./VisibilityMenuItem";
import useBoard from "../../hooks/useBoard";
import apiClient from "../../services/apiClient";
import useAuth from "../../hooks/useAuth";

const VisibilityMenu = () => {
  const { board, setBoard } = useBoard();
  const { auth } = useAuth();
  const toast = useToast({ duration: 2000, position: "top-right", status: "error" });
  const boardClient = new apiClient(`boards/${board.id}`);

  const updateBoardVisibility = (status: boolean) => {
    boardClient
      .updateData({ visibility: status }, null)
      .then(() => setBoard({ ...board, visibility: status }))
      .catch((e) => toast({ description: e.response.data.message }));
  };

  return (
    <Menu>
      <MenuButton as={Button} variant="private" isDisabled={auth.user?.id !== board.authorId}>
        <HStack paddingX={2}>
          <Icon boxSize={5} as={board.visibility ? IoEarth : IoMdLock} />
          <Text width="70px" fontSize={16}>
            {board.visibility ? "Public" : "Private"}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList padding={4} borderRadius={18}>
        <Box>
          <Heading variant="generic" fontSize={18} color="grayDark" marginBottom={2}>
            Visibilty
          </Heading>
          <Text variant="generic" fontSize={16} color="grayLight">
            Choose who can see this board.
          </Text>
        </Box>
        <VisibilityMenuItem
          active={board.visibility}
          ClickCB={() => updateBoardVisibility(true)}
          icon={IoEarth}
          title="Public"
          description="Anyone on the internet can see this."
        />
        <VisibilityMenuItem
          active={!board.visibility}
          ClickCB={() => updateBoardVisibility(false)}
          icon={IoMdLock}
          title="Private"
          description="Only board members can see this."
        />
      </MenuList>
    </Menu>
  );
};

export default VisibilityMenu;
