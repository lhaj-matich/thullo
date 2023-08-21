import { Box } from "@chakra-ui/react";
import { BiSolidUserCircle } from "react-icons/bi";

import SectionTitle from "../Panel/SectionTitle";
import UserInfo from "../UserInfo";
import useBoard from "../../hooks/useBoard";

const BoardAuthor = () => {
  const { board } = useBoard();
  return (
    <Box marginBottom={5}>
      <SectionTitle title="Made by" icon={BiSolidUserCircle} />
      <UserInfo
        creationDate={new Date(board.createdAt || Date.now())}
        image={board.author?.profileImage}
        name={board.author?.fullname}
      />
    </Box>
  );
};

export default BoardAuthor;
