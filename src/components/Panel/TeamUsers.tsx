import { Box, HStack, Text, Button, useToast } from "@chakra-ui/react";
import { RiTeamFill } from "react-icons/ri";

import UserInfo from "../List/UserInfo";
import SectionTitle from "./SectionTitle";
import useBoard from "../../hooks/useBoard";
import apiClient from "../../services/apiClient";

interface TeamUsersProps {
  edit: boolean;
}

const TeamUsers = ({ edit }: TeamUsersProps) => {
  const { board, setBoard } = useBoard();
  const boardClient = new apiClient("/users/");
  const toast = useToast({ duration: 2000, position: "top-right", status: "error" });

  const removeUser = (id: string) => {
    const newBoardUsers = board.users?.filter((user) => user.id !== id);
    boardClient
      .deleteData(`${id}/boards`)
      .then(() => setBoard({ ...board, users: newBoardUsers }))
      .catch((e) => toast({ description: e.response.data.message }));
  };

  return (
    <Box marginTop={2}>
      <SectionTitle title="Team" icon={RiTeamFill} />
      <HStack justifyContent="space-between" marginY={3}>
        <UserInfo name={board.author?.fullname} image={board.author?.profileImage} />
        <Text textAlign="center" variant="generic" fontSize="14px" color="#828282" width="100px">
          Admin
        </Text>
      </HStack>
      {board.users?.map((user, index) => (
        <HStack justifyContent="space-between" marginY={3} key={index}>
          <UserInfo name={user.fullname} image={user.profileImage} />
          {edit ? (
            <Button variant="outlineRed" onClick={() => removeUser(user.id)}>
              Remove
            </Button>
          ) : (
            <Text textAlign="center" variant="generic" fontSize="14px" color="#828282" width="100px">
              Member
            </Text>
          )}
        </HStack>
      ))}
    </Box>
  );
};

export default TeamUsers;
