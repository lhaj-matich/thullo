import { HStack } from "@chakra-ui/react";

import VisibilityMenu from "../Menu/VisibilityMenu";
import UserGroupList from "../List/UserGroupList";
import AssignMember from "../AssignMember";
import BoardEditMenu from "../Menu/BoardEditMenu";
import useBoard from "../../hooks/useBoard";


const BoardNavBar = () => {
  const { board } = useBoard();
  return (
    <HStack padding={6} backgroundColor="#fff" justifyContent="space-between">
      <HStack>
        <VisibilityMenu />
        <UserGroupList marginX={2} max={5} users={[...(board?.author ? [board.author] : []), ...(board.users || [])]} />
        <AssignMember />
      </HStack>
      <BoardEditMenu />
    </HStack>
  );
};

export default BoardNavBar;
