import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { User } from "../BoardSearch";
import { createImageLink } from "../../utils/loadImage";

interface userListProps {
  max: number;
  users: User[];
  // ! Need to change the type of users to User interface
}

const UserGroupList = ({ max, users }: userListProps) => {
  const userExcess = users.length > max ? users.length - max : 0;
  const displayedUsers = users.length > max ? users.slice(0, max) : users;
  return (
    <Box>
      <HStack>
        {displayedUsers.map((user, index) => (
          <Avatar
            marginRight="5px"
            key={index}
            color="white"
            bgColor="#BDBDBD"
            boxSize="38px"
            borderRadius="8px"
            name={user.fullname}
            src={createImageLink(user.profileImage)}
          />
        ))}
        {userExcess ? <Text variant="generic" color="#BDBDBD">+ {userExcess} others</Text> : ""}
      </HStack>
    </Box>
  );
};

export default UserGroupList;
