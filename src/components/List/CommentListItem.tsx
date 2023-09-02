import { HStack, VStack, Heading, Box, Link } from "@chakra-ui/react";
import UserInfo from "../UserInfo";
import useBoard from "../../hooks/useBoard";
import moment from "moment";

const CommentListItem = () => {
  const { board } = useBoard();
  return (
    <VStack alignItems="flex-start" padding={3} marginBottom={2} borderBottom="1px solid #F1F1F1">
      <HStack width="100%" justifyContent="space-between" alignItems="flex-start">
        <UserInfo
          image={board.author?.profileImage}
          name={board.author?.fullname}
          creationDate={moment(board.createdAt).format("D MMMM [at] h:mm")}
        />
        <Box fontSize="14px" color="#828282" fontFamily="Poppins">
          <Link margin={1}>Edit</Link>-<Link margin={1}>Delete</Link>
        </Box>
      </HStack>
      <Heading marginTop={2} variant="generic" fontWeight={500} fontSize="17px">Once the ideas is clearly defined, the task can move to #todo stage.</Heading>
    </VStack>
  );
};

export default CommentListItem;
