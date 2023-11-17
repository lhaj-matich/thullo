import { Box, HStack, Heading, Spinner, useStyleConfig } from "@chakra-ui/react";

import UserListItem from "./UserListItem";
import { User } from "../Nav/BoardSearch";
import { createImageLink } from "../../utils/loadImage";

interface userListProps {
  userId: string;
  onClick: (id: string) => void;
  users: User[] | undefined;
  loading: boolean;
}

const UserList = ({ onClick, users, userId, loading }: userListProps) => {
  const styles = useStyleConfig("BoxStyle", { variant: "usersList" });
  if (loading)
    return (
      <HStack justifyContent="center" padding={5}>
        <Spinner color="primary" />
      </HStack>
    );
  if (users?.length == 0)
    return (
      <Heading
        textAlign="center"
        paddingY={5}
        letterSpacing="-0.42px"
        color="#BDBDBD"
        fontSize="20px"
        fontFamily="Poppins"
        fontWeight={400}
      >
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
