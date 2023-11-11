import { Box } from "@chakra-ui/react";
import { BiSolidUserCircle } from "react-icons/bi";

import SectionTitle from "../Panel/SectionTitle";
import UserInfo from "../List/UserInfo";
import useBoard from "../../hooks/useBoard";
import moment from "moment";

const BoardAuthor = () => {
  const { board } = useBoard();
  return (
    <Box marginBottom={5}>
      <SectionTitle title="Made by" icon={BiSolidUserCircle} marginY={3} />
      <UserInfo
        creationDate={`on ${moment(board.createdAt).format("ll")}`}
        image={board.author?.profileImage}
        name={board.author?.fullname}
      />
    </Box>
  );
};

export default BoardAuthor;
