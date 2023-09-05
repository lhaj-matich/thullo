import {  Box, Heading, useStyleConfig } from "@chakra-ui/react";

import UserListItem from "./UserListItem";
import { User } from "./BoardSearch";
import { createImageLink } from "../utils/loadImage";

interface userListProps {
  userId: string;
  onClick: (id: string) => void;
  users: User[] | undefined;
}

const UserList = ({ onClick, users, userId }: userListProps) => {
  const styles = useStyleConfig("BoxStyle", { variant: "usersList" });
  if (users?.length == 0)
    return (
      <Heading textAlign="center" paddingY={5} letterSpacing="-0.42px" color="#BDBDBD" fontSize="20px" fontFamily="Poppins" fontWeight={400}>
        No available users.
      </Heading>
    );
  return (
    <Box __css={styles} marginTop={3} maxHeight={205}>
      {users?.map((item, index) => (
        <UserListItem
          id={item.id}
          name={item.fullname}
          image={createImageLink(item.profileImage)}
          setUserId={onClick}
          active={item.id === userId}
          key={index}
        />
      ))}
    </Box>
  );
};

export default UserList;
