import React from "react";
import { IoMdLock } from "react-icons/io";
import { HStack, Image, Icon, Text, Heading, useStyleConfig } from "@chakra-ui/react";
import { HiUserGroup } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../utils/truncateText";

interface BoardListItemProps {
  visibility: boolean;
  id: string;
  name: string;
  image: string | null;
  members: number | undefined;
}

const BoardListItem = ({ name, image, members, id, visibility }: BoardListItemProps) => {
  const styles = useStyleConfig("HStack", { variant: "ListItemButton" });
  const navigate = useNavigate();

  return (
    <HStack __css={styles} onClick={() => navigate(`/boards/${id}`)}>
      <HStack>
        <Image borderRadius="12px" src={image || ""} height="40px" width="40px" />
        <Heading as="p" letterSpacing="-0.5px" fontWeight="400" color="#4F4F4F" fontFamily="Poppins" fontSize="16px">
          {truncateText(name, 26)}
        </Heading>
      </HStack>
      <HStack>
        {!visibility ? <Icon as={IoMdLock} color="#4F4F4F" bgColor="#D3D3D3" padding="2px" borderRadius="20px" /> : ""}
        <HStack alignItems="center" width="50px">
          <Icon as={HiUserGroup} color="#4F4F4F" />
          <Text color="#4F4F4F" fontSize="15px">
            {members}
          </Text>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default BoardListItem;
