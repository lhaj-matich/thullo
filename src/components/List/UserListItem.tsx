import React from "react";
import { Box, Avatar, Heading, HStack, useStyleConfig } from "@chakra-ui/react";

interface UserItemProps {
  id: string;
  active: boolean;
  name: string;
  image: string;
  setUserId: (id: string) => void;
}

//! Should truncate the name

const UserListItem = ({ active, name, image, setUserId, id }: UserItemProps) => {
  const styles = useStyleConfig("HStack", { variant: "ListItemButtonGhost" });
  return (
    <Box marginTop={1}>
      <HStack
        marginBottom={2}
        __css={styles}
        bgColor={active ? "#E5E4E2" : "#fff"}
        onClick={() => setUserId(id)}
      >
        <Avatar
          marginRight={2}
          boxSize="45px"
          borderRadius={12}
          name={name}
          src={image || ""}
          bgColor="#BDBDBD"
          color="#fff"
        />
        <Heading letterSpacing="-0.42px" color="#4F4F4F" fontSize="16px" fontFamily="Poppins" fontWeight={600}>
          {name}
        </Heading>
      </HStack>
    </Box>
  );
};

export default UserListItem;
