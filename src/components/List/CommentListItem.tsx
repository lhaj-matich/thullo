import { HStack, VStack, Heading, Box, Link } from "@chakra-ui/react";
import UserInfo from "../UserInfo";
import moment from "moment";
import { Comment } from "../../config/entities";

interface CommentItemProps {
  commentData: Comment;
}

const CommentListItem = ({ commentData: comment }: CommentItemProps) => {
  return (
    <VStack width="100%" alignItems="flex-start" padding={3} marginBottom={2} borderBottom="1px solid #F1F1F1">
      <HStack width="100%" justifyContent="space-between" alignItems="flex-start">
        <UserInfo
          image={comment.user?.profileImage}
          name={comment.user?.fullname}
          creationDate={moment(comment.createdAt).format("D MMMM [at] h:mm")}
        />
        <Box fontSize="14px" color="#828282" fontFamily="Poppins">
          <Link margin={1}>Edit</Link>-<Link margin={1}>Delete</Link>
        </Box>
      </HStack>
      <Heading marginTop={2} variant="generic" fontWeight={400} fontSize="16px">
        {comment.content}
      </Heading>
    </VStack>
  );
};

export default CommentListItem;
