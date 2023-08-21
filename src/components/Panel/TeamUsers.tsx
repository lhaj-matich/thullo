import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { RiTeamFill } from "react-icons/ri";

import UserInfo from "../UserInfo";
import SectionTitle from "./SectionTitle";
import useBoard from "../../hooks/useBoard";

interface TeamUsersProps {
  edit: boolean;
}

const TeamUsers = ({ edit }: TeamUsersProps) => {
  const { board } = useBoard();

  // Remove user logic

  return (
    <Box>
      <SectionTitle title="Team" icon={RiTeamFill} />
      <HStack justifyContent="space-between" marginY={3}>
        <UserInfo name={board.author?.fullname} image={board.author?.profileImage} />
        <Text textAlign="center" variant="generic" fontSize="14px" color="#828282" width="100px">
          Admin
        </Text>
      </HStack>
      {board.users?.map((user) => (
        <HStack justifyContent="space-between" marginY={3}>
          <UserInfo name={user.fullname} image={user.profileImage} />
          {edit ? (
            <Button variant="outlineRed">Remove</Button>
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
