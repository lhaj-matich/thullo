import { VStack } from "@chakra-ui/react";
import CommentListItem from "./CommentListItem";
import CommentCard from "../Card/CommentCard";

const CommentsList = () => {
  return (
    <VStack>
      <CommentCard />
      <CommentListItem />
      <CommentListItem />
    </VStack>
  );
};

export default CommentsList;
